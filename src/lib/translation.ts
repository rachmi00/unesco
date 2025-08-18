export type Language = "en" | "fr"

export interface Translations {
  // Header
  appTitle: string
  appSubtitle: string

  // Homepage
  heroTitle: string
  heroSubtitle: string
  heroDescription: string
  choosePathTitle: string
  choosePathDescription: string

  // Age Groups
  teenHub: string
  teenAges: string
  adultLearning: string
  adultAges: string
  startLearning: string

  // Features
  whyChooseTitle: string
  whyChooseDescription: string
  interactiveTitle: string
  interactiveDescription: string
  ageAppropriateTitle: string
  ageAppropriateDescription: string
  localContextTitle: string
  localContextDescription: string
  gamifiedTitle: string
  gamifiedDescription: string

  // Progress
  progressTitle: string
  progressDescription: string
  overallProgress: string
  modulesCompleted: string
  completed: string
  notStarted: string
  reviewModule: string
  allModulesComplete: string
  resetProgress: string

  // Navigation
  home: string
  scenario: string
  caseStudy: string
  progress: string

  // Common
  next: string
  previous: string
  complete: string
  congratulations: string

  // Footer
  footerDescription: string
  languages: string
}

export const translations: Record<Language, Translations> = {
  en: {
    // Header
    appTitle: "MIL Awareness",
    appSubtitle: "Stop Hate Speech",

    // Homepage
    heroTitle: "Learn to Recognize and Stop Hate Speech",
    heroSubtitle: "Interactive Learning Platform",
    heroDescription:
      "Join our interactive journey to build a more respectful and inclusive community. Learn through engaging scenarios designed for your age group.",
    choosePathTitle: "Choose Your Learning Path",
    choosePathDescription:
      "Each path is specially designed with age-appropriate content, scenarios, and interactions to make learning effective and engaging.",

    // Age Groups
    teenHub: "Teen Hub",
    teenAges: "Ages 13-19 years",
    adultLearning: "Adult Learning",
    adultAges: "Ages 20+ years",
    startLearning: "Start Learning",

    // Features
    whyChooseTitle: "Why Choose Our Platform?",
    whyChooseDescription: "Built specifically for the Cameroon context with proven educational methods",
    interactiveTitle: "Interactive Learning",
    interactiveDescription:
      "Inspired by proven methods like Google Jigsaw's phishing quiz, our interactive scenarios make learning engaging and memorable.",
    ageAppropriateTitle: "Age-Appropriate Content",
    ageAppropriateDescription:
      "Each module is carefully designed with content, language, and scenarios that resonate with specific age groups.",
    localContextTitle: "Local Context",
    localContextDescription:
      "Scenarios and examples are tailored to Cameroon's cultural context, making the learning more relevant and impactful.",
    gamifiedTitle: "Gamified Progress",
    gamifiedDescription:
      "Earn badges, track progress, and celebrate achievements as you build your media literacy skills.",

    // Progress
    progressTitle: "Your Learning Progress",
    progressDescription: "Continue your journey toward becoming a media literacy champion",
    overallProgress: "Overall Progress",
    modulesCompleted: "modules completed",
    completed: "Completed",
    notStarted: "Not Started",
    reviewModule: "Review Module",
    allModulesComplete: "All Modules Complete!",
    resetProgress: "Reset Progress",

    // Navigation
    home: "Home",
    scenario: "Scenario",
    caseStudy: "Case Study",
    progress: "Progress",

    // Common
    next: "Next",
    previous: "Previous",
    complete: "Complete",
    congratulations: "Congratulations!",

    // Footer
    footerDescription: "Building a more respectful and inclusive digital community in Cameroon",
    languages: "Languages",
  },

  fr: {
    // Header
    appTitle: "Sensibilisation MIL",
    appSubtitle: "Arrêter les Discours de Haine",

    // Homepage
    heroTitle: "Apprenez à Reconnaître et Arrêter les Discours de Haine",
    heroSubtitle: "Plateforme d'Apprentissage Interactif",
    heroDescription:
      "Rejoignez notre parcours interactif pour construire une communauté plus respectueuse et inclusive. Apprenez à travers des scénarios engageants conçus pour votre groupe d'âge.",
    choosePathTitle: "Choisissez Votre Parcours d'Apprentissage",
    choosePathDescription:
      "Chaque parcours est spécialement conçu avec du contenu, des scénarios et des interactions adaptés à l'âge pour rendre l'apprentissage efficace et engageant.",

    // Age Groups
    teenHub: "Espace Ados",
    teenAges: "Âges 13-19 ans",
    adultLearning: "Apprentissage Adultes",
    adultAges: "Âges 20+ ans",
    startLearning: "Commencer l'Apprentissage",

    // Features
    whyChooseTitle: "Pourquoi Choisir Notre Plateforme?",
    whyChooseDescription:
      "Construite spécifiquement pour le contexte camerounais avec des méthodes éducatives éprouvées",
    interactiveTitle: "Apprentissage Interactif",
    interactiveDescription:
      "Inspiré par des méthodes éprouvées comme le quiz de phishing de Google Jigsaw, nos scénarios interactifs rendent l'apprentissage engageant et mémorable.",
    ageAppropriateTitle: "Contenu Adapté à l'Âge",
    ageAppropriateDescription:
      "Chaque module est soigneusement conçu avec du contenu, un langage et des scénarios qui résonnent avec des groupes d'âge spécifiques.",
    localContextTitle: "Contexte Local",
    localContextDescription:
      "Les scénarios et exemples sont adaptés au contexte culturel du Cameroun, rendant l'apprentissage plus pertinent et impactant.",
    gamifiedTitle: "Progression Gamifiée",
    gamifiedDescription:
      "Gagnez des badges, suivez vos progrès et célébrez vos réussites en développant vos compétences en littératie médiatique.",

    // Progress
    progressTitle: "Vos Progrès d'Apprentissage",
    progressDescription: "Continuez votre parcours pour devenir un champion de la littératie médiatique",
    overallProgress: "Progrès Global",
    modulesCompleted: "modules terminés",
    completed: "Terminé",
    notStarted: "Pas Commencé",
    reviewModule: "Réviser le Module",
    allModulesComplete: "Tous les Modules Terminés!",
    resetProgress: "Réinitialiser les Progrès",

    // Navigation
    home: "Accueil",
    scenario: "Scénario",
    caseStudy: "Étude de Cas",
    progress: "Progrès",

    // Common
    next: "Suivant",
    previous: "Précédent",
    complete: "Terminer",
    congratulations: "Félicitations!",

    // Footer
    footerDescription: "Construire une communauté numérique plus respectueuse et inclusive au Cameroun",
    languages: "Langues",
  },
}

export const getTranslation = (language: Language): Translations => {
  return translations[language] || translations.en
}
