import { useState, useEffect, useRef } from "react";
import { motion } from "motion/react";
import { RotateCcw, X } from "lucide-react";

const WORDS = [
	"the", "be", "to", "of", "and", "a", "in", "that", "have", "it",
	"for", "not", "on", "with", "he", "as", "you", "do", "at", "this",
	"but", "his", "by", "from", "they", "we", "say", "her", "she", "or",
	"an", "will", "my", "one", "all", "would", "there", "their", "what", "so",
	"up", "out", "if", "about", "who", "get", "which", "go", "me", "when",
	"make", "can", "like", "time", "no", "just", "him", "know", "take", "people",
	"into", "year", "your", "good", "some", "could", "them", "see", "other", "than",
	"then", "now", "look", "only", "come", "its", "over", "think", "also", "back",
	"after", "use", "two", "how", "our", "work", "first", "well", "way", "even",
	"new", "want", "because", "any", "these", "give", "day", "most", "us",
];

interface TypingTestProps {
	onClose: () => void;
}

export function TypingTest({ onClose }: TypingTestProps) {
	const [words, setWords] = useState<string[]>([]);
	const [currentWordIndex, setCurrentWordIndex] = useState(0);
	const [currentCharIndex, setCurrentCharIndex] = useState(0);
	const [input, setInput] = useState("");
	const [startTime, setStartTime] = useState<number | null>(null);
	const [endTime, setEndTime] = useState<number | null>(null);
	const [errors, setErrors] = useState(0);
	const [charStates, setCharStates] = useState<("correct" | "incorrect" | "")[][]>([]);
	const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
	const inputRef = useRef<HTMLInputElement>(null);
	const charRefs = useRef<(HTMLSpanElement | null)[][]>([]);

	const WORD_COUNT = 50;

	useEffect(() => {
		const generatedWords = Array.from({ length: WORD_COUNT }, () =>
			WORDS[Math.floor(Math.random() * WORDS.length)]
		);
		setWords(generatedWords);
		setCharStates(generatedWords.map(word => Array(word.length).fill("")));
		charRefs.current = generatedWords.map(word => Array(word.length).fill(null));

		inputRef.current?.focus();
	}, []);

	useEffect(() => {
		const updateCursorPosition = () => {
			const currentWord = words[currentWordIndex];
			let charRef;

			if (currentCharIndex >= currentWord?.length) {
				charRef = charRefs.current[currentWordIndex]?.[currentWord.length - 1];
				if (charRef) {
					const rect = charRef.getBoundingClientRect();
					const containerRect = charRef.closest('.words-container')?.getBoundingClientRect();
					if (containerRect) {
						setCursorPosition({
							x: rect.right - containerRect.left,
							y: rect.top - containerRect.top + (rect.height / 2) - 12,
						});
					}
				}
			} else {
				charRef = charRefs.current[currentWordIndex]?.[currentCharIndex];
				if (charRef) {
					const rect = charRef.getBoundingClientRect();
					const containerRect = charRef.closest('.words-container')?.getBoundingClientRect();
					if (containerRect) {
						setCursorPosition({
							x: rect.left - containerRect.left,
							y: rect.top - containerRect.top + (rect.height / 2) - 12,
						});
					}
				}
			}
		};

		const timeout = setTimeout(updateCursorPosition, 0);
		return () => clearTimeout(timeout);
	}, [currentWordIndex, currentCharIndex, words]);

	useEffect(() => {
		const handleClickOutside = (e: MouseEvent) => {
			const target = e.target as HTMLElement;
			if (target.tagName === 'BUTTON' || target.closest('button')) return;

			if (inputRef.current && !inputRef.current.contains(target)) {
				setTimeout(() => {
					inputRef.current?.focus();
				}, 0);
			}
		};

		document.addEventListener("click", handleClickOutside);
		return () => document.removeEventListener("click", handleClickOutside);
	}, []);

	const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;

		if (!startTime) {
			setStartTime(Date.now());
		}

		if (value.endsWith(" ")) {
			const typedWord = value.trim();
			const currentWord = words[currentWordIndex];
			const newCharStates = [...charStates];

			for (let i = 0; i < currentWord.length; i++) {
				if (i < typedWord.length) {
					if (typedWord[i] === currentWord[i]) {
						newCharStates[currentWordIndex][i] = "correct";
					} else {
						newCharStates[currentWordIndex][i] = "incorrect";
					}
				} else {
					newCharStates[currentWordIndex][i] = "incorrect";
				}
			}

			setCharStates(newCharStates);

			if (currentWordIndex < words.length - 1) {
				setCurrentWordIndex(currentWordIndex + 1);
				setCurrentCharIndex(0);
				setInput("");
			}
			return;
		}

		if (value.length < input.length) {
			setInput(value);
			const newCharStates = [...charStates];
			const currentWord = words[currentWordIndex];

			for (let i = value.length; i < input.length; i++) {
				if (i < currentWord.length) {
					newCharStates[currentWordIndex][i] = "";
				}
			}

			setCharStates(newCharStates);
			setCurrentCharIndex(value.length);
			return;
		}

		setInput(value);

		const newCharStates = [...charStates];
		const currentWord = words[currentWordIndex];
		let newErrors = errors;

		for (let i = 0; i < value.length; i++) {
			if (i < currentWord.length) {
				if (value[i] === currentWord[i]) {
					newCharStates[currentWordIndex][i] = "correct";
				} else {
					newCharStates[currentWordIndex][i] = "incorrect";
					if (charStates[currentWordIndex][i] !== "incorrect") {
						newErrors++;
					}
				}
			}
		}

		for (let i = value.length; i < currentWord.length; i++) {
			newCharStates[currentWordIndex][i] = "";
		}

		setCharStates(newCharStates);
		setCurrentCharIndex(value.length);
		setErrors(newErrors);

		if (currentWordIndex === words.length - 1 && value === currentWord) {
			const finalCharStates = [...newCharStates];
			for (let i = 0; i < currentWord.length; i++) {
				if (value[i] === currentWord[i]) {
					finalCharStates[currentWordIndex][i] = "correct";
				}
			}
			setCharStates(finalCharStates);
			setEndTime(Date.now());
		}
	};

	const calculateWPM = () => {
		if (!startTime || !endTime) return 0;
		const timeInMinutes = (endTime - startTime) / 60000;

		let correctWords = 0;
		for (let i = 0; i < words.length; i++) {
			const wordStates = charStates[i];
			const word = words[i];
			if (wordStates && word) {
				const allCorrect = word.split('').every((_, idx) => wordStates[idx] === "correct");
				if (allCorrect) {
					correctWords++;
				}
			}
		}

		return Math.round(correctWords / timeInMinutes);
	};

	const calculateAccuracy = () => {
		let totalTyped = 0;
		let correctTyped = 0;

		for (let i = 0; i <= currentWordIndex; i++) {
			const wordStates = charStates[i];
			if (wordStates) {
				for (const state of wordStates) {
					if (state === "correct" || state === "incorrect") {
						totalTyped++;
						if (state === "correct") {
							correctTyped++;
						}
					}
				}
			}
		}

		if (totalTyped === 0) return 100;
		return Math.round((correctTyped / totalTyped) * 100);
	};

	const restart = () => {
		const generatedWords = Array.from({ length: WORD_COUNT }, () =>
			WORDS[Math.floor(Math.random() * WORDS.length)]
		);
		setWords(generatedWords);
		setCharStates(generatedWords.map(word => Array(word.length).fill("")));
		charRefs.current = generatedWords.map(word => Array(word.length).fill(null));
		setCurrentWordIndex(0);
		setCurrentCharIndex(0);
		setInput("");
		setStartTime(null);
		setEndTime(null);
		setErrors(0);
		inputRef.current?.focus();
	};

	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
			transition={{ duration: 0.6, ease: "easeInOut" }}
			className="fixed right-24 w-1/2 flex items-start text-muted-foreground pointer-events-auto"
			style={{
				top: "6rem",
				height: "calc(100vh - 12rem)",
				lineHeight: "1.2em",
			}}
		>
			<div className="w-full overflow-auto pointer-events-auto">
				{!endTime ? (
					<>
						<div className="mb-8 flex flex-wrap gap-2 text-xl font-mono leading-relaxed words-container relative">
							<motion.div
								className="absolute w-0.5 h-6 bg-foreground"
								animate={{
									x: cursorPosition.x,
									y: cursorPosition.y,
								}}
								transition={{
									type: "spring",
									stiffness: 500,
									damping: 35,
								}}
							/>

							{words.map((word, wordIdx) => (
								<div key={wordIdx} className="flex">
									{word.split("").map((char, charIdx) => {
										const state = charStates[wordIdx]?.[charIdx] || "";

										return (
											<span
												key={charIdx}
												ref={(el) => {
													if (!charRefs.current[wordIdx]) {
														charRefs.current[wordIdx] = [];
													}
													charRefs.current[wordIdx][charIdx] = el;
												}}
												className={`
													${state === "correct" ? "text-foreground" : ""}
													${state === "incorrect" ? "text-red-500" : ""}
													${state === "" ? "text-muted-foreground" : ""}
												`}
											>
												{char}
											</span>
										);
									})}
								</div>
							))}
						</div>

						<div className="flex gap-6 pointer-events-auto relative z-10">
							<button
								onMouseDown={(e) => {
									e.preventDefault();
									e.stopPropagation();
									restart();
								}}
								className="hover:text-foreground transition-colors cursor-pointer flex items-center gap-2"
								title="restart"
							>
								<RotateCcw className="w-4 h-4" />
							</button>
							<button
								onMouseDown={(e) => {
									e.preventDefault();
									e.stopPropagation();
									onClose();
								}}
								className="hover:text-foreground transition-colors cursor-pointer flex items-center gap-2"
								title="close"
							>
								<X className="w-4 h-4" />
							</button>
						</div>

						<input
							ref={inputRef}
							type="text"
							value={input}
							onChange={handleInput}
							className="opacity-0 absolute -z-10"
							autoFocus
						/>
					</>
				) : (
					<div className="space-y-8 pointer-events-auto">
						<div className="space-y-4">
							<div className="text-5xl font-bold text-foreground">
								{calculateWPM()} <span className="text-xl text-muted-foreground">wpm</span>
							</div>
							<div className="text-2xl text-muted-foreground">
								{calculateAccuracy()}% accuracy
							</div>
						</div>

						<div className="flex gap-6">
							<button
								onClick={restart}
								className="text-foreground transition-colors cursor-pointer flex items-center gap-2"
								title="try again"
							>
								<RotateCcw className="w-5 h-5" />
							</button>
							<button
								onClick={onClose}
								className="text-muted-foreground hover:text-foreground transition-colors cursor-pointer flex items-center gap-2"
								title="close"
							>
								<X className="w-5 h-5" />
							</button>
						</div>
					</div>
				)}
			</div>
		</motion.div>
	);
}
