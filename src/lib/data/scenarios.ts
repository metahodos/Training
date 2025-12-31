export const INITIAL_SCENARIOS = [
    {
        title: "The Silent Lead",
        description: "The Lead Developer refuses to speak during the Daily Scrum. The team is getting frustrated.",
        role_target: "SM",
        difficulty: "Junior",
        initial_context: "You are a Junior Scrum Master. It's 10:00 AM. Your team is gathered for the Daily Scrum. The Lead Developer, Alex, is looking at their phone and clearly not paying attention. The Junior Dev just finished speaking. What do you do?"
    },
    {
        title: "Feature Creep",
        description: "A stakeholder demands a new feature be added to the current Sprint impacting the goal.",
        role_target: "PO",
        difficulty: "Mid",
        initial_context: "You are the Product Owner. It's Day 5 of the Sprint. The Marketing Director, Sarah, bursts into the room demanding a new 'Urgent' landing page for a campaign launching next week. Using the team's capacity would jeopardize the Sprint Goal. How do you handle Sarah?"
    },
    {
        title: "Retro Blame Game",
        description: "The Retrospective turns into a toxic blame session between QA and Devs.",
        role_target: "SM",
        difficulty: "Senior",
        initial_context: "You are the Scrum Master. The Sprint failed to meet the goal. In the Retrospective, the QA Lead is shouting at the Backend Dev about 'lazy code' and 'ignoring bugs'. The Backend Dev is shutting down. The atmosphere is toxic. Intervene."
    },
    {
        title: "Vague Requirements",
        description: "The team rejects a story during planning because acceptance criteria are missing.",
        role_target: "PO",
        difficulty: "Junior",
        initial_context: "You are the PO during Sprint Planning. You've brought a user story 'As a user, I want to login'. The team is asking specific questions about 2FA, social login, and error states which you haven't defined. They are refusing to estimate it. Manage the situation."
    }
];
