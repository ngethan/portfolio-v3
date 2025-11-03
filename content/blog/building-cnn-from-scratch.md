---
title: "Building a CNN from Scratch"
date: Dec 2024
excerpt: Implementing a convolutional neural network from scratch in Python to classify handwritten digits from the MNIST dataset.
tags: [Machine Learning, Deep Learning, Python]
readTime: 8 min read
ogImage: /writing/building-cnn-from-scratch/og.png
---

I thought it'd be fun to do this so here we are.

## Process

### Convolution Operation

Figuring out the convolution was quite simple and just involved adapting the _valid_ cross-correlation formula which is sliding the kernel on top of the input, multiplying the adjacent values, and summing them up. To get the convolution, it involved rotating the kernel 180 degrees. Thus, finding the convolution looked like $$conv(I, K) = I * rot180(K)$$

### Implementing the Convolutional Layer

#### Forward Kernel

Now the crux of the CNN—the convolutional layer. This involved taking in a 3 dimensional block of data as inputs (depth being 3). The kernels are also a 3 dimensional block in this case, spanning the full depth of the input. Something neat is that we can have multiple kernels, all of which extend the depth of the input. Each kernel contains a bias matrix that has the same shape as the output. Then, the layer would produce a 3 dimensional block of data as the output. Computing the output involved taking the cross-correlation with the input data and summing this up with the bias. That process is repeated with each kernel. We use the following formula for calculating the outputs: $$Y_1 = B_1 + X_1 \star K_{11} + X_2 \star K_{12} + X_3 \star K_{13}$$
We can repeat the use of this equation for every kernel, simply by using a different kernel and bias matrix. The inputs, $$X_n$$, would stay the same. This is called the **forward propagation** of the convolutional layer.

Using sum notation, we can write it like this:

$$Y_i = B_i + \sum_{j=1}^{n} X_j \star K_{ij}, \space\space\space\space\space i =1...d$$

#### Backward Kernel

To update the kernels and biases, we need to compute their gradients. We're given the derivative of E, $$\frac{\mathrm{d} E}{\mathrm{d} Y_i}$$, and we need to compute two things. First, the derivative of E with respect to the trainable parameters of the layer, $$\frac{\mathrm{d} E}{\mathrm{d} K_{ij}}$$.

Second, the derivative of E with respect to the input of the layer, $$\frac{\mathrm{d} E}{\mathrm{d} B_i}$$.

Once you find these, we use the backward method by initializing empty arrays for the kernel and input gradients. We compute the derivative of E with respect to k, i, and j inside two nested for loops that go through the indices k, i, and j. We do this by simply translating the mathematical formula into code (with the help of SciPy's signal class).

> [!NOTE]
> To be honest, this is where I got really lost and I definitely will be revisiting this later to better understand what's going on here. This is also the core element of computer vision algorithms that are using deep learning today so it's pretty important to understand this part.

#### Implementing the Reshape Layer

So this layer is inherited from the base layer class. The class looks something like this:

```python
class Reshape(Layer):
    def __init__(self, input_shape, output_shape):
        self.input_shape = input_shape
        self.output_shape = output_shape

    def forward(self, input):
        return np.reshape(input, self.output_shape)

    def backward(self, output_gradient, learning_rate):
        return np.reshape(output_gradient, self.input_shape)
```

The constructor takes in the shape of the input and output. The forward method reshapes the input to the output shape. The backward method reshapes the output to the input shape. Not too much going on here.

#### Binary Cross-Entropy Loss

We're given a vector, $$Y^\ast$$, containing the desired outputs of the neural network. Keep in mind $$y_i \space\epsilon\space \{0, 1\}$$ (hence the term binary).

We also have the actual output of the neural network, $$Y$$.

The binary cross entropy loss is defined as the following:

$$E = -\frac{1}{n} \sum_{i=1}^{n} \left[ y_i^\ast \log(y_i) + (1 - y_i^\ast) \log(1 - y_i) \right]$$

The goal is to compute the derivative of E with respect to the output. Upon plugging $$E$$ into $$\frac{\partial E}{\partial y_1}$$, we find that $$Y_1$$ only appears in the first term.

Thus, we can just use the chain rule and we get the following:

$$\frac{\partial E}{\partial y_i} = \frac{1}{n} \left( \frac{1 - y_i^\ast}{1 - y_i} - \frac{y_i^\ast}{y_i} \right)$$

Also, I added a small epsilon value that prevents log(0) and division by 0. After converting this to code, it looks something like this:

```python
import numpy as np

def binary_cross_entropy(y_true, y_pred):
    epsilon = 1e-15
    y_pred = np.clip(y_pred, epsilon, 1 - epsilon)

    return -np.mean(y_true * np.log(y_pred) + (1 - y_true) * np.log(1 - y_pred))

def binary_cross_entropy_prime(y_true, y_pred):
    epsilon = 1e-15
    y_pred = np.clip(y_pred, epsilon, 1 - epsilon)

    return ((1 - y_true) / (1 - y_pred) - y_true / y_pred) / np.size(y_true)
```

#### Sigmoid Activation

The sigmoid activation takes any real number and outputs a value between 0 and 1. This is particularly useful for binary classification problems where the output is interpreted as a probability. The sigmoid activation is defined as:

$$\sigma(x) = \frac{1}{1 + e^{-x}}$$

The derivative is:

$$\sigma'(x) = \frac{e^{-x}}{(1 + e^{-x})^2}$$

And the implementation looks like this:

```python
import numpy as np
from activation import Activation

class Sigmoid(Activation):
    def __init__(self):
        def sigmoid(x):
            return 1 / (1 + np.exp(-x))

        def sigmoid_prime(x):
            s = sigmoid(x)
            return s * (1 - s)

        super().__init__(sigmoid, sigmoid_prime)
```

#### Solving MNIST

MNIST is a dataset of handwritten digits (0-9). The goal of this CNN is to classify each of these images into a number. We load the MNIST dataset from the keras library like so:

```python
def preprocess_data(x, y, limit):
    zero_index = np.where(y == 0)[0][:limit]
    one_index = np.where(y == 1)[0][:limit]
    all_indices = np.hstack((zero_index, one_index))
    all_indices = np.random.permutation(all_indices)
    x, y = x[all_indices], y[all_indices]
    x = x.reshape(len(x), 1, 28, 28)
    x = x.astype("float32") / 255
    y = np_utils.to_categorical(y)
    y = y.reshape(len(y), 2, 1)
    return x, y

(x_train, y_train), (x_test, y_test) = mnist.load_data()
x_train, y_train = preprocess_data(x_train, y_train, 100)
x_test, y_test = preprocess_data(x_test, y_test, 100)
```

First, we get the indices of images representing a zero or one. Then, we stack the arrays of numbers together and shuffle them. Then, we extract only these images from the indices. Then, we reshape each image from 28x28 pixels to a 3D block of 1x28x28 pixels. This is because our convolutional layer takes in a 3D block of data with the depth as the first dimension. The images contain numbers from 0 to 255, we normalize the input by dividing each input by 255. For the output vector, we use another util from keras called `to_categorical` which will create a one-hot encoded vector from a number. Essentially, $$0 \to [1, 0] \text{ and } 1 \to [0, 1]$$. Then we use `reshape` because the dense layer takes in this type of input.

Finally, our network looks something like this:

```python
network = [
    Convolutional((1, 28, 28), 3, 5),
    Sigmoid(),
    Reshape((5, 26, 26), (5 * 26 * 26, 1)),
    Dense(5 * 26 * 26, 100),
    Sigmoid(),
    Dense(100, 2),
    Sigmoid()
]
```

We then define our epochs and learning rate. I used values `20` and `0.1` respectively.

Now for training, it looks quite similar to building a regular neural network except we are using the binary cross entropy loss in this.

```python
error += binary_cross_entropy_loss(y, output)
grad = binary_cross_entropy_loss_prime(y, output)
```

## Running It

```bash
python3 xor.py
```

## Acknowledgements

This was super fun to build and I learned a lot. Thanks to [The Independent Code](https://www.youtube.com/@independentcode) and his [extremely informative video](https://www.youtube.com/watch?v=Lakz2MoHy6o&list=PLQ4osgQ7WN6PGnvt6tzLAVAEMsL3LBqpm&index=2&t=1723s) which I followed and adapted.
