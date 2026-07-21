const S3_BASE = 'https://total-infrastructure-management-solutions.s3.ap-south-1.amazonaws.com';
const THUMBNAIL_BASE = 'https://blog.timsstudio.tech/static/media';

export const projects = [
  {
    id: '3d-visualization',
    title: '3D Visualization',
    tagline: 'Intelligent, immersive digital experiences for complex data and concepts',
    description:
      'Our AI-enhanced 3D visualization solutions turn complex data and concepts into intelligent, immersive digital experiences. From technical assets and infrastructure to products and environments, we combine AI with cutting-edge 3D modeling, animation, and visualization to deliver deeper insights, improve collaboration, streamline training, and support smarter business decisions.',
    // ctaLabel: 'Explore 3D Visualization',
    ctaLabel: 'Play Video',
    ctaLink: '/3d-visualization',
    accent: 'linear-gradient(135deg, #f6a56b 0%, #a26bf0 50%, #6b3ff0 100%)',
    poster: `${THUMBNAIL_BASE}/3dVisualization.7a05e3c4b2717dc28f45.webp`,
    previewVideo: `${S3_BASE}/previews/3d_visualization_preview.mp4`,
    fullVideo: `${S3_BASE}/3D_Workflow_Train_4.mp4`,
  },
  {
    id: 'vr-walkthrough',
    title: 'Interactive VR Walkthrough',
    tagline: 'AI-powered virtual reality for training, tours, and safety simulations',
    description:
      "Our AI-powered Interactive VR Walkthroughs blend immersive virtual reality with intelligent automation to deliver engaging, insight-driven experiences. Whether it's workforce training, safety simulations, infrastructure visualization, or virtual site tours, these solutions help organizations improve learning outcomes, enhance collaboration, and make better-informed decisions in realistic, interactive environments.",
    // ctaLabel: 'Explore VR Walkthrough',
    ctaLabel: 'Play Video',
    ctaLink: '/vr-walkthrough',
    accent: 'linear-gradient(135deg, #f6a56b 0%, #a26bf0 50%, #6b3ff0 100%)',
    poster: `${THUMBNAIL_BASE}/vrWalkthrough.4e89563522f3c8771964.webp`,
    previewVideo: `${S3_BASE}/previews/Interactive_VR_Walkthough.mp4`,
    fullVideo: `${S3_BASE}/Interactive_VR_Walkthough.mp4`,
  },
  {
    id: 'mr-interactions',
    title: 'MR Interactions',
    tagline: 'Seamlessly blending digital intelligence with the physical world',
    description:
      'Our Mixed Reality (MR) solutions seamlessly blend digital intelligence with the physical world, allowing users to interact with holograms, real-time data, and digital twins directly within their environment. Powered by AI-enabled development and advanced MR technologies, we create immersive experiences for training, maintenance, remote collaboration, and asset visualization. These solutions help organizations boost productivity, enhance safety, accelerate knowledge transfer, and make faster, more informed decisions.',
    // ctaLabel: 'Explore MR Interactions',
    ctaLabel: 'Play Video',
    ctaLink: '/mr-interactions',
    accent: 'linear-gradient(135deg, #f6a56b 0%, #a26bf0 50%, #6b3ff0 100%)',
    poster: 'https://blog.timsstudio.tech/static/media/MRInteractions.c425ff3a465c1fbcfc54.webp',
    previewVideo: `${S3_BASE}/previews/mr_interactions_preview.mp4`,
    fullVideo: `${S3_BASE}/Tree_Rigging_MR_Interactions.mp4`,
  },
  {
    id: 'xr-gaming',
    title: 'XR Gaming Experience',
    tagline: 'High-performance AR, VR, and MR gaming with AI-driven content generation',
    description:
      'Our Real-Time XR Gaming Experiences combine AR, VR, and MR technologies with AI-driven development to create immersive and interactive digital worlds. From enterprise training simulations to engaging entertainment experiences, we develop high-performance XR applications that leverage intelligent content generation, adaptive interactions, and real-time spatial computing to deliver deeper engagement and more impactful user experiences.',
    // ctaLabel: 'Explore XR Gaming',
    ctaLabel: 'Play Video',
    ctaLink: '/xr-gaming',
    accent: 'linear-gradient(135deg, #f6a56b 0%, #a26bf0 50%, #6b3ff0 100%)',
    poster: `${THUMBNAIL_BASE}/XR%20Gaming.19beb9b1045d0b3e0509.webp`,
    previewVideo: `${S3_BASE}/previews/xr_gaming_preview.mp4`,
    fullVideo: `${S3_BASE}/Chess2.mp4`,
  },
  {
    id: 'ai-tailored',
    title: 'AI Tailored To You',
    tagline: 'Secure, private AI models built specifically for your organization',
    description:
      'Give your employees instant access to the information they need with a secure AI model built for your business. Your company’s documents, knowledge, and processes can be safely integrated into a private AI environment, making it easy for teams to find answers, access information, and work more efficiently. With full control over your data and security, your AI stays private, reliable, and tailored to your organization.',
    // ctaLabel: 'Explore Custom AI',
    ctaLabel: 'Play Video',
    ctaLink: '/ai-tailored',
    accent: 'linear-gradient(135deg, #f6a56b 0%, #a26bf0 50%, #6b3ff0 100%)',
    poster: `${THUMBNAIL_BASE}/AI.5a57d376f388f4ab372f.webp`,
    previewVideo: `${S3_BASE}/previews/ai_tailored_preview.mp4`,
    fullVideo: `${S3_BASE}/ai.mov`,
  },
];