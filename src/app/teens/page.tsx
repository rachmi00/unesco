"use client"

import { ModuleLayout } from "@/components/layout/module-layout"
import { Navigation } from "@/components/layout/navigation"
import { ProgressTracker } from "@/components/common/progress-tracker"
import { ScenarioCard } from "@/components/common/scenario-card"
import { LoadingState } from "@/components/common/loading-state"
import { ErrorBoundary } from "@/components/common/error-boundary"
import { PlatformPost } from "@/components/modules/teens/platform-post"
import { TeenOptionCard } from "@/components/modules/teens/teen-option-card"
import { TeenResultDisplay } from "@/components/modules/teens/teen-result-display"
import { PlatformBadge } from "@/components/modules/teens/platform-badge"
import { useTeenModuleState } from "@/hooks/use-module-state"
import { useScenarioNavigation } from "@/hooks/use-scenario-navigation"

export default function TeensModule() {
  const {
    scenarios,
    progress,
    isLoading,
    error,
    handleOptionSelect,
    handleNext,
    getCurrentScenario,
    getMaxPoints
  } = useTeenModuleState()

  const navigation = useScenarioNavigation(
    progress.currentScenario,
    scenarios.length,
    progress.selectedOption,
    handleNext,
    progress.goToScenario,
    progress.showResult
  )

  const currentScenario = getCurrentScenario()

  if (progress.completed) {
    return (
      <TeenResultDisplay
        totalPoints={progress.totalPoints}
        maxPoints={getMaxPoints()}
        scenarioPoints={Object.values(progress.scenarioPoints)}
        onRestart={progress.resetModule}
      />
    )
  }

  return (
    <ErrorBoundary>
      <ModuleLayout
        title="Teen Digital Citizenship"
        description="Learn to identify and respond to hate speech on social media"
        badge={{ text: "Ages 13-19", variant: "secondary" }}
        navigation={
          <ProgressTracker
            current={progress.currentScenario + 1}
            total={scenarios.length}
            points={progress.totalPoints}
            maxPoints={getMaxPoints()}
            showPoints={true}
          />
        }
      >
        <LoadingState
          isLoading={isLoading}
          error={error}
          loadingText="Loading scenarios..."
          errorTitle="Failed to load teen scenarios"
        >
          {currentScenario && (
            <div className="max-w-7xl mx-auto space-y-8 px-4 sm:px-6 lg:px-8">
              {/* Hero Section */}
              <div className="text-center space-y-3 py-6">
                <div 
                  className="inline-flex items-center gap-2 px-4 py-2 text-white rounded-full text-sm font-medium shadow-lg"
                  style={{
                    background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)'
                  }}
                >
                  <PlatformBadge type={currentScenario.type} showIcon={true} size="sm" className="bg-white text-gray-900 border-gray-200" />
                  <span>Scenario {progress.currentScenario + 1} of {scenarios.length}</span>
                </div>
                <h1 
                  className="font-bold text-xl sm:text-2xl md:text-3xl lg:text-4xl"
                  style={{
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    WebkitBackgroundClip: 'text',
                    backgroundClip: 'text',
                    color: 'transparent'
                  }}
                >
                  {currentScenario.title}
                </h1>
                <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
                  Navigate this social media situation and learn about digital citizenship
                </p>
              </div>

              {/* Main Content */}
              <div className="grid xl:grid-cols-5 gap-6 lg:gap-10">
                {/* Platform Post - Left Side */}
                <div className="xl:col-span-2 space-y-4">
                  <div className="relative md:sticky md:top-20">
                    <div className="space-y-4">
                      <div className="flex items-center gap-3 justify-center xl:justify-start">
                        <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse" />
                        <span className="text-sm font-semibold text-gray-700">Live Social Media Post</span>
                      </div>
                      <PlatformPost
                        type={currentScenario.type}
                        content={currentScenario.content}
                        author={currentScenario.author}
                        platformDetails={currentScenario.platform_details}
                      />
                    </div>
                  </div>
                </div>

                {/* Scenario & Options - Right Side */}
                <div className="xl:col-span-3 space-y-8">
                  {/* Scenario Context */}
                  <ScenarioCard
                    title="The Situation"
                    context={currentScenario.context}
                    question={currentScenario.question}
                    badge={{ text: `Digital Challenge`, variant: "outline" }}
                    animated={true}
                  >
                    {currentScenario.realWorldContext && (
                      <div className="relative p-4 rounded-xl bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200/50 shadow-sm">
                        <div className="flex items-start gap-3">
                          <div className="w-5 h-5 rounded-full bg-amber-500 flex items-center justify-center mt-0.5">
                            <span className="text-white text-xs font-bold">!</span>
                          </div>
                          <div>
                            <h4 className="text-sm font-semibold text-amber-900 mb-2">Real-World Impact</h4>
                            <p className="text-sm text-amber-800 leading-relaxed">
                              {currentScenario.realWorldContext}
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </ScenarioCard>

                  {/* Options */}
                  <div className="space-y-6">
                    <div className="text-center space-y-2">
                      <h3 className="text-2xl font-bold text-gray-900">How do you respond?</h3>
                      <p className="text-gray-600">Choose your response carefully - each choice has real consequences</p>
                    </div>
                    
                    <div className="grid gap-4">
                      {currentScenario.options.map((option, index) => (
                        <TeenOptionCard
                          key={index}
                          option={option}
                          index={index}
                          isSelected={progress.selectedOption === index}
                          showResult={progress.showResult}
                          onSelect={() => handleOptionSelect(index)}
                          disabled={progress.showResult}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Navigation */}
              <div className="border-t border-gray-200/50 pt-8 mt-12">
                <div className="max-w-4xl mx-auto">
                  <Navigation
                    currentScenario={progress.currentScenario}
                    totalScenarios={scenarios.length}
                    canGoPrevious={navigation.canGoPrevious}
                    canGoNext={navigation.canGoNext}
                    onPrevious={navigation.goPrevious}
                    onNext={navigation.goNext}
                    nextButtonText={
                      progress.currentScenario === scenarios.length - 1 ? "Complete Module" : "Next Scenario"
                    }
                  />
                </div>
              </div>
            </div>
          )}
        </LoadingState>
      </ModuleLayout>
    </ErrorBoundary>
  )
}