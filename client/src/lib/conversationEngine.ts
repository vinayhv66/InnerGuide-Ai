import { Message, ConversationContext } from "@/types";

interface ResponseTemplate {
  condition: (context: ConversationContext) => boolean;
  responses: string[];
  quickResponses?: string[];
}

export class ConversationEngine {
  private responseTemplates: ResponseTemplate[] = [
    {
      condition: (context) => context.keywords.includes('overwhelmed') || context.keywords.includes('stressed'),
      responses: [
        "I truly understand how overwhelming life can feel right now, and I want you to know that what you're experiencing is completely valid and more common than you might think. When we feel overwhelmed, it's often because our minds are trying to process too many demands at once - work pressures, personal responsibilities, emotional challenges, or even just the constant stream of decisions we face daily.\n\nThis feeling usually stems from our nervous system being in a heightened state of alertness, which can make everything feel urgent and impossible to manage. Your brain is actually trying to protect you by staying hypervigilant, but this can leave you feeling exhausted and scattered.\n\nHere are some gentle ways to find your footing again: Start with the '3-3-3 rule' - name 3 things you can see, 3 sounds you can hear, and move 3 parts of your body. This grounds you in the present moment. Try breaking your day into smaller, 15-minute chunks and focus on just one thing at a time. Remember, you don't have to solve everything today. Sometimes the most productive thing you can do is rest and recharge.",
        "What you're feeling right now - that sense of being completely swamped and unable to catch your breath - is your mind and body's natural response to stress overload. It's actually a sign that you care deeply about the things in your life, which speaks to your character and values.\n\nWhen we're stressed, our bodies release cortisol and adrenaline, which were designed to help us handle immediate physical threats. But in our modern world, these chemicals can build up when we face ongoing mental and emotional challenges, leaving us feeling wired yet exhausted, focused yet scattered.\n\nLet's work together to create some breathing room in your life. One powerful technique is called 'time blocking' - instead of looking at everything you need to do as one giant mountain, we break it into small, specific tasks and assign them realistic time slots. Also, try the 'good enough' principle: not everything needs to be perfect, and doing something 80% well is often better than not doing it at all because you're aiming for 100%. Your worth isn't determined by your productivity.",
        "I can feel the weight you're carrying through your words, and I want you to know that feeling overwhelmed doesn't mean you're weak or failing - it means you're human, dealing with very real challenges. This feeling often comes from what psychologists call 'cognitive overload' - when our mental processing capacity gets stretched beyond its comfortable limits.\n\nThink of your mind like a computer with too many programs running at once - it starts to slow down and feel laggy. That's what's happening to you right now, and it's completely understandable. Often, overwhelm builds up gradually as we take on more responsibilities, worry about the future, or replay past events, until suddenly everything feels impossible.\n\nHere's what can help: First, practice the 'brain dump' technique - write down everything on your mind without organizing or prioritizing, just to get it out of your head. Then, circle only the things you can actually control and influence today. For everything else, try to consciously set it aside for now. Remember, you've navigated difficult times before, and even though it doesn't feel like it right now, you have more strength and resilience than you realize."
      ],
      quickResponses: [
        "Help me break this down into smaller steps",
        "I want to try the grounding technique you mentioned", 
        "Tell me more about managing my stress response"
      ]
    },
    {
      condition: (context) => context.keywords.includes('anxious') || context.keywords.includes('worry') || context.keywords.includes('worried'),
      responses: [
        "I want you to know that anxiety, while deeply uncomfortable, is actually your mind's way of trying to keep you safe - even when there's no real danger present. What you're experiencing is your body's ancient alarm system activating, flooding your system with stress hormones that were designed to help our ancestors escape physical threats.\n\nAnxiety often develops when our minds get caught in 'what if' spirals - imagining all the things that could go wrong, even when most of these scenarios are unlikely to happen. This is called 'catastrophic thinking,' and it's incredibly common. Your brain does this because it believes that by thinking through every possible problem, it can prevent bad things from happening.\n\nHere's what can help right now: Try the '5-4-3-2-1' grounding technique - identify 5 things you can see, 4 you can touch, 3 you can hear, 2 you can smell, and 1 you can taste. This brings you back to the present moment where you are actually safe. Also, remember that anxiety lies to us - it tells us everything is urgent and dangerous when most things aren't. You are stronger than your anxiety, and these feelings will pass.",
        "The worry you're carrying feels so real and important right now, and I understand why your mind keeps circling back to these concerns. Anxiety often stems from our need for certainty and control in an uncertain world. When we can't predict or control outcomes, our minds try to fill in the gaps by imagining worst-case scenarios.\n\nThis pattern often develops because, at some point, worrying helped protect you or someone you care about. Your mind learned that staying alert to potential problems was important for survival or success. But now, this protective mechanism might be working overtime, creating stress about things that are largely outside your control.\n\nLet's try to distinguish between 'productive worry' and 'unproductive worry.' Productive worry leads to problem-solving and action. Unproductive worry just creates suffering without solutions. Try asking yourself: 'Is this something I can actually influence right now?' If yes, what's one small step you could take? If no, try this mantra: 'I notice I'm worrying about something I can't control, and that's okay. I'm safe right now.' Remember, uncertainty doesn't equal danger.",
        "What you're experiencing with anxiety is so much more common than people talk about, and the fact that you're reaching out shows incredible courage and self-awareness. Anxiety disorders affect millions of people, and the feelings you're having - that racing heart, the tight chest, the mind that won't stop spinning - these are all normal responses to an overactive fear center in your brain.\n\nAnxiety often intensifies when we try to fight it or push it away. It's like trying to hold a beach ball underwater - the more force you use, the more violently it pops back up. Instead, try to observe your anxiety with curiosity rather than judgment. Notice where you feel it in your body, acknowledge it's there, and remind yourself that feelings are temporary visitors, not permanent residents.\n\nSome practical strategies that many find helpful: Practice 'box breathing' - inhale for 4 counts, hold for 4, exhale for 4, hold for 4. This activates your parasympathetic nervous system. Also, try challenging anxious thoughts by asking: 'What would I tell my best friend if they had this worry?' Often, we're much kinder and more rational when advising others. Remember, you've survived 100% of your difficult days so far, and this too shall pass."
      ],
      quickResponses: [
        "Teach me the grounding technique you mentioned",
        "Help me challenge my anxious thoughts",
        "I want to learn about box breathing"
      ]
    },
    {
      condition: (context) => context.keywords.includes('sad') || context.keywords.includes('depressed') || context.keywords.includes('down'),
      responses: [
        "I can sense the heaviness you're carrying, and I want you to know that reaching out takes real strength, even when everything feels difficult. Sadness and depression aren't signs of weakness - they're your mind and body's way of signaling that something needs attention and care, like physical pain alerts us to injury.\n\nDepression often happens when we've been overwhelmed for too long, experienced significant losses, or when brain chemistry shifts due to stress, genetics, or life circumstances. It's like your emotional immune system has become depleted from fighting too hard for too long. The exhaustion, the feeling that nothing matters, the difficulty finding joy in things you used to love - these are all real symptoms of a real condition, not character flaws.\n\nHere's what I want you to remember: small steps count enormously when you're depressed. Getting out of bed is an achievement. Taking a shower is self-care. Eating a meal is nourishing yourself. Try the 'one small thing' approach - just commit to one tiny positive action each day, like stepping outside for two minutes or texting one person. Also, depression lies to us by saying we're alone and that nothing will get better. But you are not alone, and with support and time, these feelings can and do change.",
        "The sadness you're experiencing feels so overwhelming right now, and I want to acknowledge how difficult it is to carry this weight. Sometimes sadness comes from specific losses or disappointments, but other times it settles in without an obvious cause, which can feel confusing and frustrating. Both types are equally valid and deserving of care.\n\nWhen we're deeply sad, our brains actually change - the areas responsible for motivation and pleasure become less active, which is why everything can feel pointless or exhausting. This isn't your fault; it's a physiological response to emotional distress. Your brain is actually trying to conserve energy and protect you by slowing things down, but this can create a cycle where inactivity leads to more sadness.\n\nGentle ways to start breaking this cycle: Try 'opposite action' - when sadness tells you to isolate, reach out to one person. When it says to stay in bed, try sitting by a window for five minutes. Practice 'radical acceptance' by saying 'I notice I'm feeling very sad right now, and that's okay. Feelings are information, not instructions.' Consider creating a 'comfort kit' - gather items that bring tiny moments of comfort like soft textures, soothing scents, or photos of people who care about you. Remember, healing isn't linear, and you don't have to be grateful or positive - you just have to be here, and that's enough.",
        "Your willingness to share these feelings shows such courage, especially when depression or sadness makes us believe we're burdens or that no one could understand. But I do understand, and what you're feeling is shared by so many people who are also struggling in silence. Depression often comes with shame, making us feel like we should be able to 'snap out of it' or be stronger, but this thinking only adds suffering to an already difficult experience.\n\nSadness and depression can stem from many sources: unresolved grief, chronic stress, hormonal changes, seasonal patterns, genetics, trauma, or major life transitions. Sometimes it's a combination of factors, and sometimes there's no clear 'reason' at all. Your brain chemistry, life experiences, and current stressors all interact in complex ways that can lead to these difficult feelings.\n\nWhat helps many people: Create structure without pressure - maybe that's making your bed or having coffee at the same time each day. Practice 'self-compassion' by speaking to yourself as you would to a dear friend going through the same struggle. Consider 'behavioral activation' - engaging in small activities that used to bring you some pleasure, even if they don't feel appealing now. Most importantly, please don't try to handle this completely alone. Professional support can make an enormous difference, whether that's therapy, support groups, or medical care. You deserve help, and you deserve to feel better."
      ],
      quickResponses: [
        "Help me understand why I feel this way",
        "I want to try the 'one small thing' approach",
        "Tell me more about self-compassion"
      ]
    },
    {
      condition: (context) => context.keywords.some(k => this.keywords.jobSearch.includes(k)),
      responses: [
        "I can really understand how challenging and emotionally draining job searching can be. The uncertainty, the constant rejections, and the pressure to present yourself perfectly can take a serious toll on your mental health and self-worth. What you're experiencing - whether it's anxiety, discouragement, or feeling like you're not good enough - is incredibly common and completely valid.\n\nJob searching often triggers deeper feelings about our identity, value, and place in the world. When we don't get responses to applications or face rejection after interviews, it's natural for our minds to interpret this as personal failure, even though the job market is influenced by so many factors beyond our control - economic conditions, timing, company needs, and sometimes just luck.\n\nHere's what I want you to remember: your worth as a person isn't determined by employment status. You are valuable, skilled, and deserving of opportunities regardless of your current situation. Try to separate your identity from your job search outcomes. Create a routine that includes self-care activities unrelated to job searching. Set daily limits on application time to prevent burnout. Consider reaching out to your network - many opportunities come through connections rather than online applications. Remember that rejection often reflects fit and timing, not your qualifications or character.",
        "The stress and emotional impact of being unemployed or searching for work goes far beyond just financial concerns - it affects our sense of purpose, daily structure, social connections, and self-esteem. Society often ties our identity so closely to our careers that being without work can feel like losing a part of ourselves, which can lead to feelings of depression, anxiety, and social isolation.\n\nMany people experience what psychologists call 'unemployment depression' - a specific type of situational depression that includes symptoms like loss of motivation, sleep disturbances, increased irritability, and feelings of hopelessness about the future. You might also be dealing with 'job search anxiety,' which can include physical symptoms like heart palpitations before interviews, obsessive thoughts about applications, or avoidance behaviors.\n\nPractical strategies to maintain your mental health during this time: Create structure in your days by setting specific times for job searching, exercise, and personal activities. Practice self-compassion - treat yourself with the same kindness you'd show a friend in this situation. Consider this time as an opportunity for skill development, self-reflection, or pursuing interests you couldn't while employed. Stay connected with supportive people who understand your situation. Remember that career transitions, while difficult, often lead to better opportunities that align more closely with your values and goals.",
        "What you're going through with job searching is one of life's most stressful experiences, ranking alongside major life changes like moving, relationship changes, or health issues. The combination of financial pressure, uncertainty about the future, and repeated evaluation by strangers can create a perfect storm for mental health challenges.\n\nDuring extended job searches, many people develop patterns that can actually work against their success: perfectionism that prevents them from applying to 'good enough' positions, catastrophic thinking about their career prospects, or social withdrawal due to shame about their situation. You might also be experiencing 'decision fatigue' from constantly crafting applications and making choices about which opportunities to pursue.\n\nHere's a comprehensive approach to managing both the practical and emotional aspects: Set realistic daily goals for applications while also scheduling non-job-search activities. Practice mindfulness to stay present rather than spiraling into 'what if' thinking about the future. Develop a personal mission statement about what you want in your next role beyond just 'any job.' Use rejection as data, not judgment - each 'no' teaches you something about fit or market conditions. Consider working with a career counselor or therapist who specializes in career transitions. Most importantly, remember that your current situation is temporary, and your response to this challenge is building resilience and self-knowledge that will serve you throughout your career."
      ],
      quickResponses: [
        "Help me cope with job rejection",
        "I'm losing motivation in my job search",
        "I feel like a failure because I can't find work",
        "How do I maintain self-worth while unemployed?"
      ]
    },
    {
      condition: (context) => context.keywords.some(k => this.keywords.work.includes(k)),
      responses: [
        "Work stress is one of the most common sources of mental health challenges in our society, and what you're experiencing is shared by countless people who are also struggling to balance professional demands with personal well-being. The pressure to constantly perform, meet deadlines, and exceed expectations can create a chronic state of stress that affects every aspect of your life.\n\nWork-related stress often stems from feeling like you have little control over your environment, unrealistic expectations (either from others or yourself), poor work-life boundaries, or being in a role that doesn't align with your values or strengths. When we spend 8+ hours a day in a stressful environment, it's natural for this to spill over into our personal lives, affecting our relationships, sleep, and overall happiness.\n\nHere are some strategies that can help: Practice the 'transition ritual' - create a specific routine that helps you mentally leave work at work, like changing clothes or taking a short walk. Learn to distinguish between 'urgent' and 'important' tasks - not everything that feels urgent actually is. Set micro-boundaries throughout your day, like taking actual lunch breaks or not checking emails after a certain hour. Remember, your worth as a person is not determined by your productivity or professional achievements. You are valuable simply because you exist.",
        "The weight of professional responsibilities can feel crushing, especially when it seems like there's always more to do and never enough time or resources to do it well. This often creates what psychologists call 'role overload' - when the demands of your position exceed your capacity to meet them effectively, leading to feelings of inadequacy and chronic stress.\n\nMany people experience 'imposter syndrome' at work - feeling like you don't belong or aren't qualified, despite evidence to the contrary. This can create additional pressure to overwork and over-prove yourself. Additionally, toxic workplace cultures, lack of recognition, or feeling disconnected from the purpose of your work can drain your motivation and energy.\n\nPractical steps to regain some control: Try 'time-boxing' - allocate specific time blocks for different tasks and stick to them, even if the task isn't 'perfect.' Practice saying no or negotiating deadlines when possible - most people respect honest communication about capacity. Create a 'done list' alongside your to-do list to acknowledge what you've accomplished. Consider if there are aspects of your work environment or role that could be addressed through conversation with supervisors or HR. Remember, a job that consistently damages your mental health isn't sustainable long-term.",
        "Workplace stress often reflects deeper issues about how we define success, set boundaries, and advocate for our needs in professional settings. The modern work environment can create unrealistic expectations of constant availability and peak performance, which goes against our natural rhythms and need for rest and recovery.\n\nCareer-related anxiety often comes from uncertainty about the future, feeling trapped in unfulfilling work, or struggling with work-life integration. These feelings are completely understandable in a culture that often ties personal worth to professional achievement. You might be experiencing 'decision fatigue' from constant problem-solving, 'emotional labor' from managing workplace relationships, or 'burnout' from chronic workplace stress.\n\nStrategies for creating more sustainable work habits: Implement 'energy management' instead of just time management - schedule demanding tasks during your peak energy hours. Practice 'cognitive switching' - when you notice work thoughts intruding on personal time, acknowledge them and consciously redirect your attention. Create physical and mental boundaries between work and personal space. Consider what aspects of your work bring you genuine satisfaction and try to emphasize those. Most importantly, remember that it's okay to prioritize your well-being over professional advancement sometimes."
      ],
      quickResponses: [
        "Help me set better work boundaries",
        "I think I might be experiencing burnout",
        "Teach me about the transition ritual you mentioned"
      ]
    },
    {
      condition: (context) => context.keywords.includes('sleep') || context.keywords.includes('tired') || context.keywords.includes('exhausted'),
      responses: [
        "Sleep difficulties are incredibly frustrating because they create a cycle where poor sleep makes everything else harder to handle, and stress makes it harder to sleep. What you're experiencing is so common - millions of people struggle with sleep issues, and it's one of the most important factors in both physical and mental health.\n\nSleep problems often stem from what's called 'hyperarousal' - when your nervous system stays activated even when you're trying to rest. This can happen due to stress, anxiety, overstimulation from screens, irregular sleep schedules, or even consuming caffeine too late in the day. Sometimes our minds become conditioned to associate bed with worry or alertness rather than rest.\n\nHere are some gentle approaches to improve your sleep: Create a 'wind-down ritual' starting 30-60 minutes before bed - this might include dimming lights, gentle stretching, reading, or listening to calming music. Practice the '4-7-8' breathing technique in bed: breathe in for 4, hold for 7, exhale for 8. If your mind races, try 'cognitive shuffling' - randomly think of objects that start with each letter of the alphabet. Keep your bedroom cool, dark, and quiet. Most importantly, if you can't sleep within 20 minutes, get up and do a quiet, non-stimulating activity until you feel sleepy again.",
        "Exhaustion affects every aspect of your life - your mood, your ability to concentrate, your patience with others, and your capacity to handle stress. When we're chronically tired, our emotional regulation suffers, making us more prone to anxiety, irritability, and sadness. This isn't a personal failing; it's a physiological reality of sleep deprivation.\n\nMany factors can disrupt sleep: stress hormones like cortisol staying elevated, blue light from screens interfering with melatonin production, irregular schedules confusing your circadian rhythm, or underlying health conditions. Sometimes 'sleep anxiety' develops - where worry about not sleeping actually prevents sleep, creating a frustrating cycle.\n\nStrategies that can help: Maintain consistent sleep and wake times, even on weekends - your body thrives on routine. Create a 'worry window' during the day where you write down concerns so they don't surface at bedtime. Practice 'progressive muscle relaxation' - systematically tense and release each muscle group. Consider your sleep environment - is it truly conducive to rest? Avoid large meals, alcohol, and screens close to bedtime. Remember, some nights of poor sleep are normal; it's the chronic patterns that need attention.",
        "The exhaustion you're feeling goes beyond just being tired - it's likely affecting your entire quality of life, making simple tasks feel overwhelming and draining your joy from activities you usually enjoy. Chronic sleep deprivation can actually change brain chemistry, affecting the same neurotransmitters involved in depression and anxiety.\n\nSleep problems often have multiple causes: physical (pain, hormones, medical conditions), psychological (stress, trauma, depression), and behavioral (screen time, caffeine, irregular schedules). Sometimes people develop 'conditioned insomnia' where the bed becomes associated with struggle rather than rest. Racing thoughts at bedtime are incredibly common, especially for people who are stressed or anxious.\n\nComprehensive approaches to better sleep: Address the root causes of stress during waking hours through therapy, stress management, or lifestyle changes. Practice 'sleep hygiene' - consistent bedtimes, comfortable environment, and pre-sleep routines. Try 'mindfulness-based sleep techniques' like body scans or guided meditations designed for sleep. Consider if there are medical factors to explore with a healthcare provider. Create a 'sleep sanctuary' - make your bedroom a place associated only with sleep and intimacy. Remember, improving sleep often takes time and patience with yourself as you establish new patterns."
      ],
      quickResponses: [
        "Teach me the 4-7-8 breathing technique",
        "Help me create a wind-down ritual",
        "I want to learn about progressive muscle relaxation"
      ]
    },
    {
      condition: (context) => context.keywords.some(k => this.keywords.anxiety.includes(k)) || (context.keywords.includes('anxious') && context.intensity > 3),
      responses: [
        "I'm hearing several signs that suggest you might be experiencing panic or anxiety symptoms, and I want you to know that what you're describing - racing heart, difficulty breathing, racing thoughts, or that sense of impending doom - are very real physiological responses that millions of people experience. Panic attacks and anxiety disorders are among the most common mental health conditions, affecting about 40 million adults in the US alone.\n\nWhat you're experiencing happens when your brain's alarm system (the amygdala) becomes overactive and triggers your body's fight-or-flight response even when there's no real danger. This floods your system with stress hormones like adrenaline and cortisol, which cause those physical symptoms you're feeling. Your brain is trying to protect you, but it's responding to perceived threats rather than actual ones.\n\nImmediate coping strategies for when you feel panic rising: Try the '5-4-3-2-1' grounding technique - name 5 things you see, 4 you can touch, 3 you can hear, 2 you can smell, 1 you can taste. Practice belly breathing - put one hand on your chest, one on your stomach, and breathe so only the bottom hand moves. Remember that panic attacks, while terrifying, are not dangerous and will pass. If you're having frequent panic attacks or they're interfering with your daily life, please consider speaking with a mental health professional - anxiety is very treatable with therapy and/or medication.",
        "The symptoms you're describing - whether it's the physical sensations of panic, the constant 'what if' thoughts, or feeling like your mind won't stop racing - are classic signs of anxiety that has likely moved beyond normal worry into something that needs attention and support. Anxiety becomes problematic when it starts controlling your decisions, avoiding situations, or significantly impacting your sleep, relationships, or daily functioning.\n\nGeneralized anxiety often develops gradually and can include excessive worry about everyday situations, difficulty concentrating, muscle tension, fatigue from being constantly 'on alert,' and sleep disturbances. Social anxiety might show up as intense fear of judgment, physical symptoms in social situations, or avoiding social events altogether. Whatever form your anxiety takes, it's important to know that it's a medical condition, not a character flaw or something you should just 'get over.'\n\nStrategies for managing ongoing anxiety: Learn to identify your anxiety triggers and early warning signs. Practice challenging anxious thoughts by asking 'What evidence do I have for this worry?' and 'What would I tell a friend having this thought?' Create an anxiety toolkit with techniques that work for you - breathing exercises, progressive muscle relaxation, mindfulness apps, or calming music. Limit caffeine and alcohol, which can worsen anxiety symptoms. Most importantly, consider professional help - cognitive behavioral therapy (CBT) is particularly effective for anxiety, and there are excellent medications available if needed."
      ],
      quickResponses: [
        "Help me stop a panic attack right now",
        "I avoid situations because of my anxiety",
        "My worry thoughts won't stop racing",
        "I think I need professional help for my anxiety"
      ]
    },
    {
      condition: (context) => context.keywords.some(k => this.keywords.depression.includes(k)) || (context.keywords.includes('sad') && context.intensity > 3),
      responses: [
        "I'm concerned about what you're sharing because several of the things you've mentioned - feeling hopeless, worthless, empty, or like nothing matters - are significant symptoms of depression. When someone says they feel like a burden, have no energy for things they used to enjoy, or that everything feels pointless, these are red flags that suggest you might be dealing with major depression, not just temporary sadness.\n\nDepression is a serious medical condition that affects brain chemistry, specifically neurotransmitters like serotonin, dopamine, and norepinephrine that regulate mood, motivation, and energy. It's not about being weak or not trying hard enough - it's a legitimate illness that affects about 21 million adults in the US each year. The feelings of hopelessness and worthlessness are symptoms of the condition, not accurate reflections of your actual worth or future prospects.\n\nIf you're having thoughts of self-harm or suicide, please reach out for immediate help by calling 988 (Suicide & Crisis Lifeline) or going to your nearest emergency room. For ongoing depression, some strategies that can help alongside professional treatment: Try to maintain basic self-care even when it feels impossible - eating regular meals, getting some sunlight, taking showers. Practice 'behavioral activation' - engage in one small meaningful activity each day, even if you don't feel like it. Challenge depressive thoughts by asking 'Is this thought helpful?' and 'What would I tell a friend thinking this?' Depression is highly treatable - therapy, medication, or a combination can make an enormous difference."
      ],
      quickResponses: [
        "I feel hopeless about my future",
        "Nothing brings me joy anymore",
        "I feel like I'm a burden to others",
        "Help me understand if this is depression"
      ]
    },
    {
      condition: (context) => context.keywords.some(k => this.keywords.adhd.includes(k)),
      responses: [
        "What you're describing - trouble focusing, being easily distracted, feeling restless, or having difficulty completing tasks - could be signs of ADHD (Attention-Deficit/Hyperactivity Disorder). ADHD is a neurodevelopmental condition that affects executive functioning, including attention, working memory, and impulse control. It's often misunderstood as laziness or lack of willpower, but it's actually about how the brain processes information and regulates attention.\n\nADHD symptoms in adults can include: difficulty sustaining attention on tasks, procrastination, forgetfulness, feeling restless or 'on the go,' interrupting others, and difficulty organizing tasks and time. Many adults discover they have ADHD later in life when they're struggling with work demands or when their children are diagnosed. Women especially are often underdiagnosed because their symptoms may be more internalized.\n\nStrategies that can help: Break large tasks into smaller, manageable chunks. Use timers and external reminders. Create structured routines and stick to them. Find your optimal environment for focus (some people need background noise, others complete silence). Consider body doubling - working alongside others even if on different tasks. If these symptoms are significantly impacting your work, relationships, or daily life, consider getting evaluated by a mental health professional who specializes in ADHD - proper diagnosis and treatment can be life-changing."
      ],
      quickResponses: [
        "I think I might have ADHD",
        "Help me focus better",
        "I procrastinate everything",
        "My mind feels scattered all the time"
      ]
    },
    {
      condition: (context) => context.keywords.some(k => this.keywords.bipolar.includes(k)),
      responses: [
        "The patterns you're describing - significant mood swings, periods of feeling extremely energetic or euphoric followed by crashes, racing thoughts, or engaging in risky behaviors - could potentially be signs of bipolar disorder. This is a serious but treatable mental health condition that involves extreme shifts in mood, energy, and activity levels that are much more intense than typical mood changes.\n\nBipolar disorder typically involves manic or hypomanic episodes (elevated mood, increased energy, decreased need for sleep, grandiose thoughts, rapid speech, risky behavior) alternating with depressive episodes (low mood, low energy, hopelessness, sleep changes). These mood changes are distinct periods that last days to weeks, not just hour-to-hour mood fluctuations.\n\nIf you're experiencing these patterns, it's crucial to work with a mental health professional for proper evaluation and treatment. Bipolar disorder requires professional care and often involves mood stabilizing medications along with therapy. In the meantime: track your mood patterns, maintain regular sleep schedules, avoid alcohol and drugs, and build a strong support system. If you're in a manic state and considering risky behaviors, or if you're in a depressive phase with suicidal thoughts, please seek immediate professional help."
      ],
      quickResponses: [
        "My moods swing between extreme highs and lows",
        "I have periods where I don't need much sleep",
        "I make impulsive decisions during mood episodes",
        "I think I need professional evaluation"
      ]
    },
    {
      condition: (context) => context.keywords.some(k => this.keywords.ptsd.includes(k)),
      responses: [
        "What you're describing - flashbacks, nightmares, feeling triggered by certain situations, or having intrusive memories - sounds like you may be dealing with trauma responses or PTSD (Post-Traumatic Stress Disorder). Trauma can fundamentally change how our nervous system responds to the world, leaving us feeling unsafe even when we're actually safe.\n\nPTSD develops when our brain's natural recovery process gets stuck after experiencing or witnessing traumatic events. Your mind and body are trying to protect you by staying hypervigilant, but this can lead to exhaustion, emotional numbing, avoidance of triggers, sleep disturbances, and feeling disconnected from yourself and others. These are normal responses to abnormal experiences.\n\nTrauma-informed coping strategies: Practice grounding techniques when triggered - feel your feet on the floor, name objects in your environment, use ice cubes or cold water on your wrists. Create safety in your physical environment with comforting objects, good lighting, and clear exits. Develop a support network of trusted people who understand trauma. Consider EMDR therapy or trauma-focused therapy - these specialized treatments can be incredibly effective for PTSD. Remember, healing from trauma is possible, and seeking help is an act of courage, not weakness."
      ],
      quickResponses: [
        "I have flashbacks that feel very real",
        "Certain things trigger intense reactions in me",
        "I feel disconnected from my emotions",
        "Help me find trauma-informed therapy"
      ]
    },
    {
      condition: (context) => context.keywords.some(k => this.keywords.eatingDisorder.includes(k)),
      responses: [
        "I'm hearing some concerning patterns around food and eating that suggest you might be struggling with disordered eating or an eating disorder. Whether it's binge eating, restricting food intake, purging behaviors, or obsessive thoughts about calories and weight, these are serious issues that deserve compassionate professional attention.\n\nEating disorders are complex mental health conditions that often involve using food, eating, or weight control as ways to cope with difficult emotions, trauma, perfectionism, or feeling out of control in other areas of life. They're not about vanity or lack of willpower - they're serious psychological conditions that can have severe physical and emotional consequences.\n\nIf you're experiencing these struggles: please reach out to a healthcare provider who specializes in eating disorders, consider calling the National Eating Disorders Association helpline, and try to have compassion for yourself - eating disorders thrive on shame and secrecy. Recovery is absolutely possible with proper support and treatment."
      ],
      quickResponses: [
        "I'm struggling with my relationship with food",
        "I need help with binge eating",
        "My thoughts about food and weight are consuming",
        "I want to find eating disorder resources"
      ]
    }
  ];

  private defaultResponses = [
    "Thank you for trusting me with your thoughts and feelings. What you're experiencing matters deeply, and I want you to know that sharing these things takes real courage. Sometimes when we're going through difficult times, it can feel like no one understands, but please know that your experiences are valid and you deserve support and care.\n\nEvery person's journey is unique, and there's no 'right' way to feel or cope with life's challenges. Whatever brought you here today - whether it's stress, sadness, uncertainty, or just needing someone to listen - I'm honored that you've chosen to reach out. Sometimes the simple act of putting our feelings into words can help us process them and feel less alone.\n\nWould you like to tell me more about what's on your mind? I'm here to listen without judgment and to offer whatever support and understanding I can.",
    "I can hear that you're carrying something heavy right now, and I want you to know that you don't have to carry it alone. Life has a way of presenting us with challenges that can feel overwhelming, confusing, or simply exhausting. The fact that you're here, reaching out and sharing your experiences, shows incredible strength and self-awareness.\n\nOften, when we're struggling, we can feel isolated or like no one could possibly understand what we're going through. But the truth is, human experiences - while unique in their details - often share common threads of pain, hope, fear, and resilience. You are part of a larger human story, and your struggles don't make you weak; they make you human.\n\nI'm genuinely interested in understanding what you're experiencing right now. What would be most helpful for you to talk about today? Whether it's something specific that's troubling you or just a general sense that things feel difficult, I'm here to listen and support you through this.",
    "What you've shared with me shows such honesty and vulnerability, and I deeply appreciate your willingness to open up. It's not always easy to put our feelings into words or to reach out when we're struggling, but you've taken that important step. This tells me so much about your inner strength, even if it doesn't feel that way right now.\n\nSometimes we can feel like we should be able to handle everything on our own, or that asking for help is somehow a failure. But the opposite is true - recognizing when we need support and actually seeking it out is one of the most mature, wise things we can do. It shows that you value your well-being and are willing to take care of yourself.\n\nI'd love to understand more about what's bringing you here today. What aspects of your experience feel most important to talk through? There's no pressure to share everything at once - we can go at whatever pace feels right for you."
  ];

  private greetingResponses = [
    "Hello, and welcome to this safe space. I'm genuinely glad you're here, and I want you to know that whatever brought you to reach out today takes courage. This is a place where you can be completely honest about how you're feeling, without worry about judgment or having to put on a brave face.\n\nI'm here to listen, understand, and support you through whatever you're experiencing. Whether you're dealing with stress, sadness, anxiety, relationship challenges, work pressures, or just feeling overwhelmed by life in general - all of it is valid and deserving of attention and care.\n\nTake a moment to breathe and settle in. What would feel most helpful to talk about right now? How are you feeling in this moment?",
    "Welcome to your personal sanctuary - a place designed just for you to explore your thoughts and feelings safely. I'm honored that you've chosen to be here, and I want you to know that this space is entirely yours. There's no expectation to be positive, productive, or 'fine' - you can simply be exactly where you are right now.\n\nI understand that reaching out for emotional support can feel vulnerable or even scary sometimes. But please know that you've made a wise choice in prioritizing your mental and emotional well-being. Taking care of our inner lives is just as important as taking care of our physical health.\n\nI'm here to offer you my full attention, empathy, and support. What's on your heart today? What would you like to explore or talk through together?",
    "Hi there, and thank you for being here. In a world that often asks us to keep moving and stay strong no matter what, choosing to pause and tend to your emotional needs is actually a revolutionary act of self-care. I'm genuinely happy you've made this choice today.\n\nThis is your space - a place where your feelings are welcome exactly as they are, where you don't need to have answers or solutions, and where you can simply be heard and understood. Whether you're feeling lost, anxious, sad, overwhelmed, or even just need someone to process life's everyday stresses with, I'm here for all of it.\n\nWhat's been on your mind lately? What feels most important for you to share or explore right now?"
  ];

  private keywords = {
    emotions: ['happy', 'sad', 'angry', 'frustrated', 'anxious', 'worried', 'stressed', 'overwhelmed', 'depressed', 'excited', 'nervous', 'scared', 'lonely', 'confused', 'tired', 'exhausted'],
    jobSearch: ['job', 'employment', 'unemployed', 'looking for work', 'applying', 'interview', 'resume', 'hiring', 'rejected', 'no job', 'cant find', 'searching'],
    work: ['workplace', 'boss', 'colleague', 'deadline', 'meeting', 'project', 'office', 'promotion', 'fired', 'quit'],
    relationships: ['family', 'friend', 'partner', 'relationship', 'marriage', 'divorce', 'breakup', 'conflict'],
    health: ['sleep', 'eating', 'exercise', 'pain', 'medication', 'therapy', 'counseling'],
    coping: ['help', 'cope', 'manage', 'handle', 'deal', 'support', 'advice', 'technique', 'strategy'],
    // Mental health condition indicators
    anxiety: ['panic', 'racing heart', 'cant breathe', 'sweating', 'trembling', 'racing thoughts', 'what if', 'catastrophizing'],
    depression: ['hopeless', 'worthless', 'empty', 'numb', 'crying', 'no energy', 'dont care', 'pointless', 'burden'],
    adhd: ['cant focus', 'distracted', 'hyperactive', 'impulsive', 'forgetful', 'procrastinate', 'restless', 'scattered'],
    bipolar: ['mood swings', 'manic', 'euphoric', 'grandiose', 'racing thoughts', 'no sleep', 'spending spree', 'reckless'],
    ptsd: ['flashbacks', 'nightmares', 'triggered', 'avoidance', 'hypervigilant', 'trauma', 'dissociation', 'intrusive'],
    eatingDisorder: ['binge', 'purge', 'restricting', 'calories', 'weight', 'body image', 'guilt eating', 'food obsession']
  };

  analyzeMessage(message: string): ConversationContext {
    const lowerMessage = message.toLowerCase();
    const words = lowerMessage.split(/\s+/);
    
    // Extract keywords
    const foundKeywords: string[] = [];
    Object.values(this.keywords).flat().forEach(keyword => {
      if (lowerMessage.includes(keyword)) {
        foundKeywords.push(keyword);
      }
    });

    // Determine sentiment (simple approach)
    const positiveWords = ['good', 'great', 'happy', 'better', 'helped', 'thankful', 'grateful'];
    const negativeWords = ['bad', 'terrible', 'awful', 'worse', 'hate', 'angry', 'sad', 'depressed', 'anxious', 'worried', 'stressed'];
    
    let sentiment: 'positive' | 'neutral' | 'negative' = 'neutral';
    const positiveCount = positiveWords.filter(word => lowerMessage.includes(word)).length;
    const negativeCount = negativeWords.filter(word => lowerMessage.includes(word)).length;
    
    if (positiveCount > negativeCount) sentiment = 'positive';
    else if (negativeCount > positiveCount) sentiment = 'negative';

    // Determine topic with better specificity
    let topic = 'general';
    if (foundKeywords.some(k => this.keywords.jobSearch.includes(k))) topic = 'jobSearch';
    else if (foundKeywords.some(k => this.keywords.anxiety.includes(k))) topic = 'anxiety';
    else if (foundKeywords.some(k => this.keywords.depression.includes(k))) topic = 'depression';
    else if (foundKeywords.some(k => this.keywords.adhd.includes(k))) topic = 'adhd';
    else if (foundKeywords.some(k => this.keywords.bipolar.includes(k))) topic = 'bipolar';
    else if (foundKeywords.some(k => this.keywords.ptsd.includes(k))) topic = 'ptsd';
    else if (foundKeywords.some(k => this.keywords.eatingDisorder.includes(k))) topic = 'eatingDisorder';
    else if (foundKeywords.some(k => this.keywords.work.includes(k))) topic = 'work';
    else if (foundKeywords.some(k => this.keywords.relationships.includes(k))) topic = 'relationships';
    else if (foundKeywords.some(k => this.keywords.health.includes(k))) topic = 'health';
    else if (foundKeywords.some(k => this.keywords.emotions.includes(k))) topic = 'emotions';

    // Determine intensity based on message length and emotional words
    const intensity = Math.min(5, Math.max(1, Math.floor(words.length / 10) + negativeCount));

    return {
      sentiment,
      keywords: foundKeywords,
      topic,
      intensity
    };
  }

  generateResponse(message: string, isFirstMessage: boolean = false): { response: string; quickResponses?: string[] } {
    if (isFirstMessage) {
      return {
        response: this.greetingResponses[Math.floor(Math.random() * this.greetingResponses.length)],
        quickResponses: [
          "I'm feeling overwhelmed and don't know where to start",
          "Anxiety has been taking over my thoughts",
          "I've been struggling with sadness lately",
          "Work stress is affecting my life",
          "I'm having trouble sleeping and feeling exhausted"
        ]
      };
    }

    const context = this.analyzeMessage(message);
    
    // Find matching template
    const matchingTemplate = this.responseTemplates.find(template => 
      template.condition(context)
    );

    if (matchingTemplate) {
      const response = matchingTemplate.responses[
        Math.floor(Math.random() * matchingTemplate.responses.length)
      ];
      return {
        response,
        quickResponses: matchingTemplate.quickResponses
      };
    }

    // Default response
    const response = this.defaultResponses[
      Math.floor(Math.random() * this.defaultResponses.length)
    ];
    
    return {
      response,
      quickResponses: [
        "Help me understand why I feel this way",
        "What coping strategies could work for me?",
        "I need support processing these emotions",
        "Can you help me take small steps forward?"
      ]
    };
  }

  getCopingStrategies(context: ConversationContext): string[] {
    const strategies = {
      anxiety: [
        "Try the 4-7-8 breathing technique: breathe in for 4, hold for 7, exhale for 8",
        "Practice grounding: name 5 things you see, 4 you hear, 3 you touch, 2 you smell, 1 you taste",
        "Use progressive muscle relaxation: tense and release each muscle group",
        "Challenge anxious thoughts: ask yourself 'Is this thought helpful? Is it realistic?'"
      ],
      stress: [
        "Take regular breaks throughout your day, even if just for a few minutes",
        "Practice mindful breathing: focus on your breath for 5-10 minutes",
        "Write down your concerns and action steps you can take",
        "Engage in physical activity to release tension"
      ],
      sadness: [
        "Allow yourself to feel the emotion without judgment",
        "Reach out to a trusted friend or family member",
        "Engage in a creative activity like drawing, writing, or music",
        "Practice self-compassion: treat yourself as you would a good friend"
      ]
    };

    if (context.keywords.includes('anxious') || context.keywords.includes('worried')) {
      return strategies.anxiety;
    } else if (context.keywords.includes('stressed') || context.keywords.includes('overwhelmed')) {
      return strategies.stress;
    } else if (context.keywords.includes('sad') || context.keywords.includes('depressed')) {
      return strategies.sadness;
    }

    return [
      "Take slow, deep breaths to center yourself",
      "Practice mindfulness: focus on the present moment",
      "Do something kind for yourself today",
      "Remember that this feeling is temporary and will pass"
    ];
  }
}

export const conversationEngine = new ConversationEngine();
