import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Target, Users, TrendingUp, CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import heroImage from "@/assets/hero-assessment.jpg";

const Index = () => {
  const navigate = useNavigate();

  const startAssessment = () => {
    navigate("/assessment");
  };

  const features = [
    {
      icon: Target,
      title: "Comprehensive Assessment",
      description: "Psychometric evaluation combining personality, aptitude, and technical skills"
    },
    {
      icon: Users,
      title: "Career Alignment",
      description: "Discover if Agile-Waterfall Bridge Facilitator role matches your profile"
    },
    {
      icon: TrendingUp,
      title: "Personalized Insights",
      description: "Get detailed recommendations and learning paths tailored to you"
    },
    {
      icon: CheckCircle,
      title: "WISCAR Framework",
      description: "Scientifically-backed evaluation of Will, Interest, Skill, Cognitive readiness & more"
    }
  ];

  const careers = [
    "Hybrid Project Manager",
    "Agile-Waterfall Coach", 
    "Business Analyst (Hybrid)",
    "Change Manager",
    "Scrum Master (Cross-methodology)"
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative bg-gradient-hero text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <img 
          src={heroImage}
          alt="Assessment Hero"
          className="absolute inset-0 w-full h-full object-cover mix-blend-overlay"
        />
        <div className="relative container mx-auto px-4 py-20 lg:py-32">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Agile-Waterfall Bridge<br />
              <span className="text-primary-glow">Facilitator Assessment</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-white/90 max-w-3xl mx-auto">
              Discover your suitability for the critical role of bridging Agile and Waterfall methodologies. 
              Get personalized insights into your career fit, skills, and growth opportunities.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button 
                variant="hero" 
                size="lg" 
                onClick={startAssessment}
                className="text-lg px-8 py-4 h-auto"
              >
                Start Assessment
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <p className="text-white/80 text-sm">
                ⏱️ Takes 20-30 minutes • Completely free
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What is a Bridge Facilitator Section */}
      <section className="py-16 bg-gradient-card">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              What is an Agile-Waterfall Bridge Facilitator?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              A specialized hybrid project management role that enables seamless communication and workflow 
              between Agile and Waterfall teams, ensuring successful project delivery across methodologies.
            </p>
            
            <div className="grid md:grid-cols-2 gap-8 mt-12">
              <Card className="shadow-elegant">
                <CardHeader>
                  <CardTitle className="text-left">Key Responsibilities</CardTitle>
                </CardHeader>
                <CardContent className="text-left space-y-3">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span>Align processes between Agile and Waterfall teams</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span>Resolve methodology conflicts and communication gaps</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span>Facilitate cross-functional team collaboration</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span>Ensure project delivery across hybrid environments</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-elegant">
                <CardHeader>
                  <CardTitle className="text-left">Career Opportunities</CardTitle>
                </CardHeader>
                <CardContent className="text-left space-y-3">
                  {careers.map((career, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <Target className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                      <span>{career}</span>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Comprehensive Assessment Framework
            </h2>
            <p className="text-lg text-muted-foreground">
              Our scientifically-backed assessment evaluates multiple dimensions to provide 
              accurate insights into your career fit and readiness.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="shadow-elegant hover:shadow-glow transition-all duration-300 hover:-translate-y-1">
                <CardHeader className="text-center">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Key Traits Section */}
      <section className="py-16 bg-gradient-card">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Key Traits for Success
            </h2>
            <p className="text-lg text-muted-foreground mb-12">
              Our assessment evaluates these critical characteristics that predict success in the role:
            </p>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                "Strong Communication & Conflict Resolution",
                "Flexibility with Structured & Iterative Frameworks", 
                "Analytical Thinking & Problem-solving",
                "Patience & Cross-functional Team Management",
                "Emotional Intelligence & Adaptability",
                "Leadership in Hybrid Environments"
              ].map((trait, index) => (
                <div key={index} className="flex items-center gap-3 p-4 bg-white rounded-lg shadow-sm">
                  <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                  <span className="text-sm font-medium">{trait}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-hero text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Discover Your Career Fit?
          </h2>
          <p className="text-xl mb-8 text-white/90 max-w-2xl mx-auto">
            Take our comprehensive assessment and get personalized insights into your suitability 
            for the Agile-Waterfall Bridge Facilitator role.
          </p>
          <Button 
            variant="hero" 
            size="lg" 
            onClick={startAssessment}
            className="text-lg px-8 py-4 h-auto bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20"
          >
            Begin Assessment Journey
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Index;