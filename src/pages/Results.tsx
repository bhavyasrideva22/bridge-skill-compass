import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { 
  ArrowLeft, 
  Target, 
  TrendingUp, 
  BookOpen, 
  Users, 
  Star,
  CheckCircle,
  AlertCircle,
  Lightbulb
} from "lucide-react";

interface AssessmentResults {
  overallScore: number;
  recommendation: "Yes" | "No" | "Maybe";
  psychometricScore: number;
  technicalScore: number;
  wiscarScores: {
    will: number;
    interest: number;
    skill: number;
    cognitive: number;
    abilityToLearn: number;
    realWorldAlignment: number;
  };
  strengths: string[];
  concerns: string[];
  personalizedInsights: string;
  nextSteps: string[];
  alternativeRoles: string[];
  confidenceScore: number;
}

const Results = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [results, setResults] = useState<AssessmentResults | null>(null);
  
  const responses = location.state?.responses || {};

  useEffect(() => {
    // Calculate results based on responses
    const calculateResults = (): AssessmentResults => {
      // Mock calculation logic - in a real app, this would be more sophisticated
      const responseValues = Object.values(responses).map(r => parseInt(r as string) || 0);
      const avgScore = responseValues.reduce((a, b) => a + b, 0) / responseValues.length / 4 * 100;
      
      // Psychometric calculation (simplified)
      const psychometricQuestions = Object.keys(responses).filter(key => 
        key.includes('interest') || key.includes('personality') || key.includes('cognitive') || key.includes('motivation')
      );
      const psychometricSum = psychometricQuestions.reduce((sum, key) => sum + (parseInt(responses[key]) || 0), 0);
      const psychometricScore = Math.min((psychometricSum / psychometricQuestions.length / 4) * 100, 100);
      
      // Technical calculation
      const technicalQuestions = Object.keys(responses).filter(key => key.includes('technical'));
      const technicalSum = technicalQuestions.reduce((sum, key) => sum + (parseInt(responses[key]) || 0), 0);
      const technicalScore = Math.min((technicalSum / technicalQuestions.length / 3) * 100, 100);
      
      // WISCAR calculations
      const wiscarScores = {
        will: Math.min(((parseInt(responses['wiscar_will_1']) || 0) / 4) * 100, 100),
        interest: Math.min(((parseInt(responses['interest_1']) || 0) + (parseInt(responses['interest_2']) || 0)) / 2 / 4 * 100, 100),
        skill: Math.min(((parseInt(responses['wiscar_skill_1']) || 0) / 4) * 100, 100),
        cognitive: Math.min(((parseInt(responses['wiscar_cognitive_1']) || 0) / 4) * 100, 100),
        abilityToLearn: Math.min(((parseInt(responses['wiscar_ability_1']) || 0) / 3) * 100, 100),
        realWorldAlignment: Math.min(((parseInt(responses['wiscar_real_world_1']) || 0) / 3) * 100, 100)
      };
      
      const overallScore = (psychometricScore + technicalScore + Object.values(wiscarScores).reduce((a, b) => a + b, 0) / 6) / 3;
      
      let recommendation: "Yes" | "No" | "Maybe";
      let personalizedInsights: string;
      let strengths: string[] = [];
      let concerns: string[] = [];
      let nextSteps: string[] = [];
      let alternativeRoles: string[] = [];
      
      if (overallScore >= 75) {
        recommendation = "Yes";
        personalizedInsights = "Excellent! Your profile shows strong alignment with the Agile-Waterfall Bridge Facilitator role. You demonstrate the right combination of personality traits, technical understanding, and motivation needed for success.";
        strengths = [
          "Strong personality fit for facilitation role",
          "Good technical understanding of hybrid methodologies",
          "High motivation and learning ability",
          "Excellent cognitive readiness for complex environments"
        ];
        concerns = [];
        nextSteps = [
          "Enroll in advanced hybrid project management certification (PMI-ACP)",
          "Seek mentorship from experienced bridge facilitators",
          "Look for opportunities to lead cross-methodology projects",
          "Join professional communities focused on hybrid project management"
        ];
      } else if (overallScore >= 50) {
        recommendation = "Maybe";
        personalizedInsights = "You show potential for the Agile-Waterfall Bridge Facilitator role, but there are some areas that need development. With focused effort on the identified gaps, you could be well-suited for this career path.";
        strengths = [
          "Solid foundation in project management concepts",
          "Good willingness to learn and adapt",
          "Reasonable technical understanding"
        ];
        concerns = [
          "May need to develop stronger facilitation skills",
          "Could benefit from more exposure to hybrid methodologies",
          "Consider building confidence in conflict resolution"
        ];
        nextSteps = [
          "Take foundational courses in both Agile and Waterfall methodologies",
          "Practice facilitation skills through volunteer opportunities",
          "Gain hands-on experience with both methodologies",
          "Consider starting with a Business Analyst role to build skills"
        ];
        alternativeRoles = [
          "Business Analyst",
          "Junior Project Manager",
          "Scrum Master (pure Agile)",
          "Project Coordinator"
        ];
      } else {
        recommendation = "No";
        personalizedInsights = "Based on your assessment results, the Agile-Waterfall Bridge Facilitator role may not be the best fit at this time. However, there are many related career paths that might align better with your strengths and interests.";
        strengths = [
          "Shows interest in project management",
          "Willing to explore new career opportunities"
        ];
        concerns = [
          "Limited technical readiness for hybrid methodologies",
          "May prefer more structured or specialized roles",
          "Could benefit from foundational project management experience"
        ];
        nextSteps = [
          "Explore foundational project management courses",
          "Consider starting with single-methodology roles",
          "Build technical skills through hands-on practice",
          "Reassess career interests and goals"
        ];
        alternativeRoles = [
          "Traditional Project Manager",
          "Business Operations Specialist",
          "Quality Assurance Analyst",
          "Technical Writer",
          "Process Improvement Specialist"
        ];
      }
      
      return {
        overallScore: Math.round(overallScore),
        recommendation,
        psychometricScore: Math.round(psychometricScore),
        technicalScore: Math.round(technicalScore),
        wiscarScores: Object.fromEntries(
          Object.entries(wiscarScores).map(([key, value]) => [key, Math.round(value)])
        ) as typeof wiscarScores,
        strengths,
        concerns,
        personalizedInsights,
        nextSteps,
        alternativeRoles,
        confidenceScore: Math.round(overallScore * 0.9) // Slightly lower than overall for realism
      };
    };

    setResults(calculateResults());
  }, [responses]);

  const goHome = () => {
    navigate('/');
  };

  const retakeAssessment = () => {
    navigate('/assessment');
  };

  if (!results) {
    return (
      <div className="min-h-screen bg-gradient-card flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-lg text-muted-foreground">Analyzing your responses...</p>
        </div>
      </div>
    );
  }

  const getRecommendationColor = (rec: string) => {
    switch (rec) {
      case "Yes": return "text-green-600 bg-green-50 border-green-200";
      case "Maybe": return "text-yellow-600 bg-yellow-50 border-yellow-200";
      case "No": return "text-red-600 bg-red-50 border-red-200";
      default: return "text-gray-600 bg-gray-50 border-gray-200";
    }
  };

  const getRecommendationIcon = (rec: string) => {
    switch (rec) {
      case "Yes": return <CheckCircle className="h-6 w-6" />;
      case "Maybe": return <AlertCircle className="h-6 w-6" />;
      case "No": return <AlertCircle className="h-6 w-6" />;
      default: return <Target className="h-6 w-6" />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-hero text-white py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Button variant="ghost" onClick={goHome} className="text-white hover:bg-white/10 mb-6">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Button>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Your Assessment Results
            </h1>
            <p className="text-xl text-white/90">
              Comprehensive analysis of your suitability for the Agile-Waterfall Bridge Facilitator role
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto space-y-8">
          
          {/* Overall Recommendation */}
          <Card className={`shadow-elegant border-2 ${getRecommendationColor(results.recommendation)}`}>
            <CardHeader>
              <div className="flex items-center gap-4">
                {getRecommendationIcon(results.recommendation)}
                <div>
                  <CardTitle className="text-2xl">
                    Recommendation: {results.recommendation === "Yes" ? "Pursue this role!" : 
                                   results.recommendation === "Maybe" ? "Consider with development" : 
                                   "Explore alternatives"}
                  </CardTitle>
                  <p className="text-lg mt-2 opacity-90">
                    Overall Readiness Score: {results.overallScore}%
                  </p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-lg leading-relaxed mb-4">
                {results.personalizedInsights}
              </p>
              <div className="flex items-center gap-4">
                <div className="flex-1">
                  <Progress value={results.overallScore} className="h-3" />
                </div>
                <Badge variant="secondary" className="text-sm">
                  {results.confidenceScore}% Confidence
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* Detailed Scores */}
          <div className="grid md:grid-cols-2 gap-8">
            
            {/* WISCAR Framework */}
            <Card className="shadow-elegant">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  WISCAR Framework Analysis
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {Object.entries(results.wiscarScores).map(([key, score]) => (
                  <div key={key}>
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium capitalize">
                        {key === 'abilityToLearn' ? 'Ability to Learn' : 
                         key === 'realWorldAlignment' ? 'Real-World Alignment' : key}
                      </span>
                      <span className="text-sm font-bold">{score}%</span>
                    </div>
                    <Progress value={score} className="h-2" />
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Score Breakdown */}
            <Card className="shadow-elegant">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Score Breakdown
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium">Psychometric Fit</span>
                    <span className="text-sm font-bold">{results.psychometricScore}%</span>
                  </div>
                  <Progress value={results.psychometricScore} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium">Technical Readiness</span>
                    <span className="text-sm font-bold">{results.technicalScore}%</span>
                  </div>
                  <Progress value={results.technicalScore} className="h-2" />
                </div>
                <Separator />
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-bold text-lg">Overall Score</span>
                    <span className="text-lg font-bold text-primary">{results.overallScore}%</span>
                  </div>
                  <Progress value={results.overallScore} className="h-3" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Strengths and Concerns */}
          <div className="grid md:grid-cols-2 gap-8">
            
            {/* Strengths */}
            <Card className="shadow-elegant">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-green-600">
                  <Star className="h-5 w-5" />
                  Your Strengths
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {results.strengths.map((strength, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>{strength}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Areas for Development */}
            {results.concerns.length > 0 && (
              <Card className="shadow-elegant">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-orange-600">
                    <Lightbulb className="h-5 w-5" />
                    Development Areas
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {results.concerns.map((concern, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <AlertCircle className="h-5 w-5 text-orange-600 mt-0.5 flex-shrink-0" />
                        <span>{concern}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Next Steps */}
          <Card className="shadow-elegant">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5" />
                Recommended Next Steps
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-3">Action Items:</h4>
                  <ol className="space-y-2">
                    {results.nextSteps.map((step, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <Badge variant="outline" className="mt-0.5 flex-shrink-0">
                          {index + 1}
                        </Badge>
                        <span className="text-sm">{step}</span>
                      </li>
                    ))}
                  </ol>
                </div>
                
                {results.alternativeRoles.length > 0 && (
                  <div>
                    <h4 className="font-semibold mb-3">Alternative Roles to Consider:</h4>
                    <ul className="space-y-2">
                      {results.alternativeRoles.map((role, index) => (
                        <li key={index} className="flex items-center gap-3">
                          <Users className="h-4 w-4 text-primary flex-shrink-0" />
                          <span className="text-sm">{role}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
            <Button variant="hero" size="lg" onClick={retakeAssessment}>
              Retake Assessment
            </Button>
            <Button variant="outline" size="lg" onClick={goHome}>
              Return Home
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Results;