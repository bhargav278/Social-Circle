const usersData = [
    {
        firstName: "JOHN",
        lastName: "DOE",
        emailId: "john.doe01@example.com",
        password: "Password123!",
        age: 25,
        gender: "male",
        about: "An enthusiastic developer.",
        profileUrl: "https://example.com/profiles/john",
        skills: ["JavaScript", "React", "Node.js"]
    },
    {
        firstName: "JANE",
        lastName: "SMITH",
        emailId: "jane.smith02@example.com",
        password: "SecurePass1#",
        age: 30,
        gender: "female",
        about: "Loves to code and teach.",
        profileUrl: "https://example.com/profiles/jane",
        skills: ["Python", "Django", "Machine Learning"]
    },
    {
        firstName: "ALICE",
        lastName: "JOHNSON",
        emailId: "alice.johnson03@example.com",
        password: "Alice@789!",
        age: 22,
        gender: "female",
        about: "Aspiring software engineer.",
        skills: ["Java", "Spring Boot", "SQL"]
    },
    {
        firstName: "BOB",
        lastName: "LEE",
        emailId: "bob.lee04@example.com",
        password: "B0bSecure$!",
        age: 28,
        gender: "male",
        about: "Backend developer and coffee lover.",
        skills: ["C#", ".NET", "Azure"]
    },
    {
        firstName: "CHARLES",
        lastName: "DAVIS",
        emailId: "charles.davis05@example.com",
        password: "Char1esPass!",
        age: 33,
        gender: "male",
        about: "Full-stack developer with a love for UX.",
        profileUrl: "https://example.com/profiles/charles",
        skills: ["HTML", "CSS", "JavaScript"]
    },
    {
        firstName: "EMMA",
        lastName: "WILSON",
        emailId: "emma.wilson06@example.com",
        password: "Emm@12345",
        age: 29,
        gender: "female",
        about: "UI/UX designer.",
        skills: ["Sketch", "Figma", "Photoshop"]
    },
    {
        firstName: "HARRY",
        lastName: "POTTER",
        emailId: "harry.potter07@example.com",
        password: "HarryMagic@99",
        age: 26,
        gender: "male",
        about: "Software engineer by day, wizard by night.",
        skills: ["JavaScript", "Python", "GraphQL"]
    },
    {
        firstName: "LILY",
        lastName: "EVANS",
        emailId: "lily.evans08@example.com",
        password: "LilySecure$8",
        age: 27,
        gender: "female",
        about: "Data scientist and music lover.",
        skills: ["Python", "R", "Data Analysis"]
    },
    {
        firstName: "RON",
        lastName: "WEASLEY",
        emailId: "ron.weasley09@example.com",
        password: "RonRock$56",
        age: 23,
        gender: "male",
        about: "Frontend developer and gamer.",
        skills: ["Vue.js", "CSS", "JavaScript"]
    },
    {
        firstName: "GINNY",
        lastName: "WEASLEY",
        emailId: "ginny.weasley10@example.com",
        password: "Ginny$Power123",
        age: 24,
        gender: "female",
        about: "Junior web developer.",
        skills: ["HTML", "CSS", "JavaScript"]
    },
    {
        firstName: "MICHAEL",
        lastName: "SCOTT",
        emailId: "michael.scott11@example.com",
        password: "WorldsBestBoss1!",
        age: 45,
        gender: "male",
        about: "Regional manager.",
        skills: ["Sales", "Management", "Leadership"]
    },
    {
        firstName: "PAM",
        lastName: "BEESLY",
        emailId: "pam.beesly12@example.com",
        password: "P@ssw0rdPam1!",
        age: 28,
        gender: "female",
        about: "Creative designer.",
        skills: ["Illustrator", "Photoshop", "Art"]
    },
    {
        firstName: "DWIGHT",
        lastName: "SCHRUTE",
        emailId: "dwight.schrute13@example.com",
        password: "Dund3rMifflin!",
        age: 35,
        gender: "male",
        about: "Assistant to the regional manager.",
        skills: ["Sales", "Agriculture", "Martial Arts"]
    },
    {
        firstName: "JIM",
        lastName: "HALPERT",
        emailId: "jim.halpert14@example.com",
        password: "Jim$123Halp",
        age: 32,
        gender: "male",
        about: "Sales representative and prankster.",
        skills: ["Sales", "Marketing", "Pranks"]
    },
    {
        firstName: "KELLY",
        lastName: "KAPOOR",
        emailId: "kelly.kapoor15@example.com",
        password: "Kelly@Kapoor99",
        age: 27,
        gender: "female",
        about: "Customer relations expert.",
        skills: ["Customer Service", "Social Media", "Drama"]
    },
    {
        firstName: "RYAN",
        lastName: "HOWARD",
        emailId: "ryan.howard16@example.com",
        password: "Ryan$Inc1ognito",
        age: 29,
        gender: "male",
        about: "Former temp turned VP.",
        skills: ["Sales", "Marketing", "Startups"]
    },
    {
        firstName: "STANLEY",
        lastName: "HUDSON",
        emailId: "stanley.hudson17@example.com",
        password: "Stanl3y$Pass",
        age: 58,
        gender: "male",
        about: "Sales representative with a love for crosswords.",
        skills: ["Sales", "Crosswords", "Patience"]
    },
    {
        firstName: "PHYLLIS",
        lastName: "LAPIN",
        emailId: "phyllis.lapin18@example.com",
        password: "PhyllisLove@22",
        age: 54,
        gender: "female",
        about: "Motherly figure in the sales team.",
        skills: ["Sales", "Negotiation", "Friendliness"]
    },
    {
        firstName: "ANDY",
        lastName: "BERNARD",
        emailId: "andy.bernard19@example.com",
        password: "NardD0g@Corn3ll",
        age: 33,
        gender: "male",
        about: "Salesman and acapella enthusiast.",
        skills: ["Sales", "Singing", "Guitar"]
    },
    {
        firstName: "ANGELA",
        lastName: "MARTIN",
        emailId: "angela.martin20@example.com",
        password: "AngelaK1ttens!",
        age: 38,
        gender: "female",
        about: "Accounting and cat lover.",
        skills: ["Accounting", "Organizing", "Cats"]
    },
    {
        firstName: "TOBY",
        lastName: "FLENDERSON",
        emailId: "toby.flenderson21@example.com",
        password: "TobyTheHR@1!",
        age: 42,
        gender: "male",
        about: "HR rep everyone loves to hate.",
        skills: ["HR", "Counseling", "Listening"]
    },
    {
        firstName: "OSCAR",
        lastName: "MARTINEZ",
        emailId: "oscar.martinez22@example.com",
        password: "OscarMath1@!",
        age: 41,
        gender: "male",
        about: "Financial whiz.",
        skills: ["Accounting", "Excel", "Finance"]
    },
    {
        firstName: "KEVIN",
        lastName: "MALONE",
        emailId: "kevin.malone23@example.com",
        password: "Kev1nM@lone!",
        age: 39,
        gender: "male",
        about: "Accounting clerk who loves chili.",
        skills: ["Accounting", "Cooking", "Chili"]
    },
    {
        firstName: "CREED",
        lastName: "BRATTON",
        emailId: "creed.bratton24@example.com",
        password: "CreepyCree@d42",
        age: 55,
        gender: "male",
        about: "Mysterious quality assurance director.",
        skills: ["Mystery", "Singing", "Bizarre"]
    },
    {
        firstName: "MEREDITH",
        lastName: "PALMER",
        emailId: "meredith.palmer25@example.com",
        password: "Meredith$Fun1",
        age: 48,
        gender: "female",
        about: "Supplier relations and a party lover.",
        skills: ["Procurement", "Socializing", "Parties"]
    },
    {
        firstName: "JAN",
        lastName: "LEVINSON",
        emailId: "jan.levinson26@example.com",
        password: "JanLov1e@#Corp",
        age: 43,
        gender: "female",
        about: "Former VP of regional sales.",
        skills: ["Sales", "Corporate Management", "Assertiveness"]
    },
    {
        firstName: "HOLLY",
        lastName: "FLAX",
        emailId: "holly.flax27@example.com",
        password: "Holly@HR8!",
        age: 34,
        gender: "female",
        about: "Kind-hearted HR rep.",
        skills: ["HR", "Counseling", "Empathy"]
    },
    // Add 23 more entries following the schema until reaching 50
];
module.exports = usersData;