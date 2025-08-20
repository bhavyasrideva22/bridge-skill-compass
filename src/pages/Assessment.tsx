import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Question {
  id: string;
  section: string;
  question: string;
  type: 'radio' | 'likert';
  options: string[];
  category: 'psychometric' | 'technical' | 'wiscar';
  construct?: string;
}

const questions: Question[] = [
  // Psychometric Section - Interest Scale
  {
    id: "interest_1",
    section: "Interest Assessment",
    question: "How interested are you in facilitating communication between different project management methodologies?",
    type: "likert",
    options: ["Not at all interested", "Slightly interested", "Moderately interested", "Very interested", "Extremely interested"],
    category: "psychometric",
    construct: "interest"
  },
  {
    id: "interest_2", 
    section: "Interest Assessment",
    question: "How appealing is the idea of working with both structured (Waterfall) and flexible (Agile) approaches?",
    type: "likert",
    options: ["Not appealing", "Slightly appealing", "Moderately appealing", "Very appealing", "Extremely appealing"],
    category: "psychometric",
    construct: "interest"
  },
  
  // Personality Compatibility - Big Five
  {
    id: "personality_1",
    section: "Personality Assessment",
    question: "I am systematic and organized in my approach to work.",
    type: "likert",
    options: ["Strongly disagree", "Disagree", "Neutral", "Agree", "Strongly agree"],
    category: "psychometric",
    construct: "conscientiousness"
  },
  {
    id: "personality_2",
    section: "Personality Assessment", 
    question: "I enjoy exploring new ideas and approaches to problem-solving.",
    type: "likert",
    options: ["Strongly disagree", "Disagree", "Neutral", "Agree", "Strongly agree"],
    category: "psychometric",
    construct: "openness"
  },
  {
    id: "personality_3",
    section: "Personality Assessment",
    question: "I feel comfortable leading discussions and facilitating group meetings.",
    type: "likert",
    options: ["Strongly disagree", "Disagree", "Neutral", "Agree", "Strongly agree"],
    category: "psychometric",
    construct: "extraversion"
  },
  {
    id: "personality_4",
    section: "Personality Assessment",
    question: "I am good at understanding and managing conflicts between team members.",
    type: "likert",
    options: ["Strongly disagree", "Disagree", "Neutral", "Agree", "Strongly agree"],
    category: "psychometric",
    construct: "agreeableness"
  },
  
  // Cognitive Style & Preferences
  {
    id: "cognitive_1",
    section: "Cognitive Style",
    question: "When approaching a complex problem, I prefer to:",
    type: "radio",
    options: [
      "Break it down systematically into smaller, manageable parts",
      "Look for creative, innovative solutions first",
      "Gather all available data before making decisions",
      "Rely on intuition and past experience"
    ],
    category: "psychometric",
    construct: "cognitive_style"
  },
  {
    id: "cognitive_2",
    section: "Cognitive Style",
    question: "In a work environment, I thrive best when:",
    type: "radio",
    options: [
      "I have clear structure and defined processes",
      "I have flexibility to adapt and change approaches",
      "I can balance structure with adaptability",
      "I can work independently without constraints"
    ],
    category: "psychometric",
    construct: "cognitive_style"
  },
  
  // Motivation Assessment
  {
    id: "motivation_1",
    section: "Motivation Assessment",
    question: "What motivates you most in a work role?",
    type: "radio",
    options: [
      "Personal growth and skill development",
      "Recognition and career advancement",
      "Making a meaningful impact on projects",
      "Financial rewards and stability"
    ],
    category: "psychometric",
    construct: "motivation"
  },
  {
    id: "motivation_2",
    section: "Motivation Assessment",
    question: "When facing a difficult challenge, I am most likely to:",
    type: "radio",
    options: [
      "Persist until I find a solution",
      "Seek help from others",
      "Try different approaches until something works",
      "Take a break and return with fresh perspective"
    ],
    category: "psychometric",
    construct: "grit"
  },
  
  // Technical & Aptitude Section
  {
    id: "technical_1",
    section: "Technical Knowledge",
    question: "Which of the following best describes the primary difference between Agile and Waterfall methodologies?",
    type: "radio",
    options: [
      "Agile is faster, Waterfall is slower",
      "Agile is iterative and adaptive, Waterfall is sequential and planned",
      "Agile is for software, Waterfall is for hardware",
      "Agile has no documentation, Waterfall has extensive documentation"
    ],
    category: "technical",
    construct: "basic_knowledge"
  },
  {
    id: "technical_2",
    section: "Technical Knowledge", 
    question: "What is the main challenge when bridging Agile and Waterfall teams?",
    type: "radio",
    options: [
      "Different meeting schedules",
      "Conflicting communication styles and planning approaches",
      "Different software tools",
      "Salary differences between teams"
    ],
    category: "technical",
    construct: "domain_knowledge"
  },
  {
    id: "technical_3",
    section: "Problem Solving",
    question: "You notice tension between an Agile team that wants to change requirements and a Waterfall team that needs fixed specifications. What would you do first?",
    type: "radio",
    options: [
      "Tell the Agile team to follow the Waterfall specifications",
      "Organize a joint meeting to understand both perspectives",
      "Escalate the issue to management",
      "Create separate workstreams for each team"
    ],
    category: "technical",
    construct: "problem_solving"
  },
  
  // WISCAR Framework
  {
    id: "wiscar_will_1",
    section: "WISCAR - Will",
    question: "How committed are you to investing time in learning hybrid project management approaches?",
    type: "likert",
    options: ["Not committed", "Slightly committed", "Moderately committed", "Very committed", "Extremely committed"],
    category: "wiscar",
    construct: "will"
  },
  {
    id: "wiscar_skill_1",
    section: "WISCAR - Skill",
    question: "Rate your current ability to facilitate meetings with diverse stakeholders:",
    type: "likert",
    options: ["Poor", "Below average", "Average", "Above average", "Excellent"],
    category: "wiscar",
    construct: "skill"
  },
  {
    id: "wiscar_cognitive_1",
    section: "WISCAR - Cognitive",
    question: "How comfortable are you with managing complexity and ambiguity in project requirements?",
    type: "likert",
    options: ["Very uncomfortable", "Uncomfortable", "Neutral", "Comfortable", "Very comfortable"],
    category: "wiscar",
    construct: "cognitive"
  },
  {
    id: "wiscar_ability_1",
    section: "WISCAR - Ability to Learn",
    question: "When receiving feedback about your performance, you:",
    type: "radio",
    options: [
      "Sometimes get defensive but try to learn",
      "Welcome it as an opportunity to improve",
      "Find it stressful but necessary",
      "Use it to identify specific areas for development"
    ],
    category: "wiscar",
    construct: "ability_to_learn"
  },
  {
    id: "wiscar_real_world_1",
    section: "WISCAR - Real-World Alignment",
    question: "Which scenario most closely matches your ideal work environment?",
    type: "radio",
    options: [
      "Leading a single methodology team (pure Agile or Waterfall)",
      "Facilitating collaboration between different methodology teams",
      "Working as an individual contributor on technical tasks",
      "Managing high-level strategy and planning"
    ],
    category: "wiscar",
    construct: "real_world_alignment"
  }
];

const Assessment = () => {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [responses, setResponses] = useState<Record<string, string>>({});
  
  const progress = ((currentQuestion + 1) / questions.length) * 100;
  const currentQ = questions[currentQuestion];

  const handleResponse = (value: string) => {
    setResponses(prev => ({
      ...prev,
      [currentQ.id]: value
    }));
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      // Navigate to results with responses
      navigate('/results', { state: { responses } });
    }
  };

  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    }
  };

  const goBack = () => {
    navigate('/');
  };

  const canProceed = responses[currentQ.id] !== undefined;

  return (
    <div className="min-h-screen bg-gradient-card">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="max-w-4xl mx-auto mb-8">
          <div className="flex items-center justify-between mb-6">
            <Button variant="ghost" onClick={goBack} className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Button>
            <div className="text-sm text-muted-foreground">
              Question {currentQuestion + 1} of {questions.length}
            </div>
          </div>
          
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <h1 className="text-2xl font-bold">Bridge Facilitator Assessment</h1>
              <span className="text-sm font-medium">{Math.round(progress)}% Complete</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        </div>

        {/* Question Card */}
        <div className="max-w-4xl mx-auto">
          <Card className="shadow-elegant">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg font-semibold text-primary">
                    {currentQ.section}
                  </CardTitle>
                  <p className="text-sm text-muted-foreground mt-1">
                    {currentQ.category === 'psychometric' && 'Personality & Interest Assessment'}
                    {currentQ.category === 'technical' && 'Technical Knowledge & Problem Solving'}
                    {currentQ.category === 'wiscar' && 'Readiness Framework Evaluation'}
                  </p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <h2 className="text-xl font-medium leading-relaxed">
                {currentQ.question}
              </h2>
              
              {currentQ.type === 'radio' ? (
                <RadioGroup 
                  value={responses[currentQ.id] || ""} 
                  onValueChange={handleResponse}
                  className="space-y-3"
                >
                  {currentQ.options.map((option, index) => (
                    <div key={index} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                      <RadioGroupItem value={index.toString()} id={`option-${index}`} className="mt-1" />
                      <Label htmlFor={`option-${index}`} className="cursor-pointer leading-relaxed flex-1">
                        {option}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              ) : (
                <RadioGroup 
                  value={responses[currentQ.id] || ""} 
                  onValueChange={handleResponse}
                  className="space-y-2"
                >
                  {currentQ.options.map((option, index) => (
                    <div key={index} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                      <RadioGroupItem value={index.toString()} id={`likert-${index}`} />
                      <Label htmlFor={`likert-${index}`} className="cursor-pointer flex-1 text-center">
                        {option}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              )}
            </CardContent>
          </Card>

          {/* Navigation */}
          <div className="flex justify-between items-center mt-8">
            <Button 
              variant="outline" 
              onClick={prevQuestion}
              disabled={currentQuestion === 0}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Previous
            </Button>
            
            <Button 
              variant="hero"
              onClick={nextQuestion}
              disabled={!canProceed}
              className="flex items-center gap-2"
            >
              {currentQuestion === questions.length - 1 ? 'View Results' : 'Next'}
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Assessment;