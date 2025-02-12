import React from "react";
import Link from "next/link";

const work = [
    {
        company: "Connect",
        title: "Co-Founder & CTO",
        url: "https://connectalum.com",
        duration: "Dec '23 — Present",
        description: (
            <>
                <li>
                    Leading the development of web and mobile-based educational technology software with over 5000 monthly
                    active users using Turbopack, Next.js, React Native TRPC, PostgreSQL, DrizzleORM, and TailwindCSS
                </li>
                <li>
                    Engineered a scalable real-time chat application handling 5000+ monthly active users, implemented
                    efficient post and user search using embeddings, and multi-tenanted organization features
                </li>
                <li>
                    Setup self-hosted backend tools Grafana, Infisical, statsd, Okta, and a documentation website hosted on
                    AWS Linux
                </li>
                <li>
                    Implemented CI/CD and hosting pipelines with SST, OpenNext, and EC2, achieving a 15% increase in system
                    uptime
                </li>
                <li>
                    Received non-dilutive funding from WashU{" "}
                    <Link
                        href="https://skandalaris.wustl.edu/blog/2024/11/20/washu-startups-shine-skandalaris-center-awards-50000-at-the-innovation-entrepreneurship-awards/"
                        target="_blank"
                        className="text-primary-500 hover-animation-500"
                    >
                        Skandalaris Venture Competition
                    </Link>
                    , Skandalaris IdeaBounce, and Olin Business Cup
                </li>
            </>
        ),
        tags: ["Next.js", "React Native", "PostgreSQL", "DrizzleORM", "TailwindCSS", "SST", "EC2"],
    },
    {
        company: "DevSTAC",
        title: "Lead Developer",
        url: "https://techden.wustl.edu/programs/devstac-2-2/",
        duration: "Jun '24 — Present",
        description: (
            <>
                <li>
                    Developed robust analytics software for Moelis Asset Management to track profiles in the private equity
                    sector using TypeScript, PostgreSQL, and Tableau
                </li>
                <li>
                    Assisted WashU&apos;s Office of Sustainability in developing a mobile app to display dynamic UI based on
                    consumers&apos; energy type and spending habits using React Native
                </li>
                <li>
                    Leading the development of a mobile app with various brain games in collaboration with Netrix Global
                    utilizing Swift, Construct3, PostgreSQL, and React.js
                </li>
            </>
        ),
        tags: ["Client Engagement", "Product Management"],
    },
    {
        company: "BloomPal",
        title: "Lead Software Engineer",
        url: "https://bloompal-wellness.com/",
        duration: "Dec '23 — May '24",
        description: (
            <>
                <li>
                    Led a team of 4 engineers to develop a stress-tracking mobile app with Swift and published it to the app
                    store
                </li>
                <li>Trained LLM to parse Apple HealthKit data into personalized recommendations on alleviating stress</li>
            </>
        ),
        tags: ["Swift", "Apple HealthKit", "Product Management"],
    },
    {
        company: "RadiantAI",
        title: "Software Engineering Intern",
        duration: "Sept '23 — Jan '24",
        description: (
            <>
                <li>
                    Collaborated directly with founders, formerly of Lyft and Amazon, to redesign UI/UX in efforts to target
                    $2 million seed round; helped to increase average user retention by around 10%
                </li>
                <li>
                    Designed user-centric interfaces in Figma for proprietary medical AI query engine; built designs with
                    Next.js & TailwindCSS; honed through iterative sprints following stakeholder & user feedback
                </li>
            </>
        ),
        tags: ["Next.js", "TailwindCSS", "Figma", "shadcn", "Typescript"],
    },
    {
        company: "Ethan Ng Technologies, LLC",
        title: "CEO",
        duration: "Sept '20 — Dec '23",
        description: (
            <>
                <li>
                    Developed software solutions, including websites, Java plugins, mobile apps, and Discord bots for over 50
                    clients and generated over $150K in revenue across 4 years
                </li>
                <li>
                    Led project management, maintaining a 98% on-time delivery rate &amp; 92% satisfaction rate across over 70
                    projects
                </li>
                <li>Recruited and managed a team of 3 developers and a contract manager, demonstrating leadership skills</li>
            </>
        ),
        tags: ["Leadership", "Product Management", "Web Design", "Communication", "Client Engagement"],
    },
    {
        company: "theCoderSchool",
        title: "Teacher",
        url: "https://thecoderschool.com/",
        duration: "Sept '21 — Mar '23",
        description: (
            <>
                <li>
                    Taught over 50 beginner and intermediate programmers; fostered a productive and respectful learning
                    environment; utilized feedback loops to perfect teaching strategies
                </li>
                <li>Created tailored learning curriculums for Python, Java, JavaScript, HTML, and CSS</li>
                <li>Delegated teaching process through training and mentoring interns</li>
            </>
        ),
        tags: ["Python", "Java", "Web Development", "Teaching"],
    },
    // {
    //     company: "Aetheria",
    //     title: "Lead Developer",
    //     url: "https://discord.aetheria.world",
    //     duration: "Jun '22 - Feb '23",
    //     description: [
    //         "Used Java & Paper API to develop highly functional Minecraft plugins",
    //         "Used TypeScript & discord.js to develop a general purpose discord management bot",
    //         "Managed the server, staff, and oversaw the server's overall operation",
    //     ],
    //     tags: ["Java", "Paper API", "Typescript", "Discord.js", "Product Management"],
    // },
];

export default work;
