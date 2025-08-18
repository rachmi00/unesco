"use client"

import { ModuleLayout } from "@/components/layout/module-layout"
import { Navigation } from "@/components/layout/navigation"
import { ProgressTracker } from "@/components/common/progress-tracker"
import { ScenarioCard } from "@/components/common/scenario-card"
import { LoadingState } from "@/components/common/loading-state"
import { ErrorBoundary } from "@/components/common/error-boundary"
import { StakeholderList } from "@/components/modules/adults/stakeholder-list"
import { LegalContext } from "@/components/modules/adults/legal-context"
import { AdultOptionCard } from "@/components/modules/adults/adult-option-card"
import { AdultResultDisplay } from "@/components/modules/adults/adult-result-display"
import { useAdultModuleState } from "@/hooks/use-module-state"
import { useScenarioNavigation } from "@/hooks/use-scenario-navigation"
import { ADULT_CATEGORY_CONFIGS } from "@/lib/data/constants"
import { ImpactLevel } from "@/types/scenarios"

export default function AdultsModule() {
  const {
    scenarios,
    progress,
    isLoading,
    error,
    handleOptionSelect,
    handleNext,
    getCurrentScenario,
    getMaxPoints
  } = useAdultModuleState()

  const navigation = useScenarioNavigation(
    progress.currentScenario,
    scenarios.length,
    progress.selectedOption,
    handleNext,
    progress.goToScenario,
    progress.showResult
  )

  const currentScenario = getCurrentScenario()

  const getImpactCounts = () => {
    const counts: Record<ImpactLevel, number> = { positive: 0, neutral: 0, negative: 0 };
    Object.values(progress.scenarioPoints).forEach((points) => {
      if (points >= 4) counts.positive++;
      else if (points >= 2) counts.neutral++;
      else counts.negative++;
    });
    return counts;
  };

  if (progress.completed) {
    return (
      <AdultResultDisplay
        totalScore={progress.totalPoints}
        maxScore={getMaxPoints()}
        impactCounts={getImpactCounts()}
        onRestart={progress.resetModule}
      />
    )
  }

  return (
    <ErrorBoundary>
      <ModuleLayout
        title="Professional Ethics Assessment"
        description="Explore real-world workplace and community scenarios through ethical decision-making."
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
          errorTitle="Unable to load scenarios"
        >
          {currentScenario && (
            <div className="w-full max-w-5xl mx-auto px-3 sm:px-4 lg:px-6">
              
              {/* Mobile-Optimized Scenario Header */}
              <header className="mb-4 sm:mb-6 lg:mb-10 text-center">
                <p className="text-xs sm:text-sm text-gray-500 mb-1 sm:mb-2">
                  {ADULT_CATEGORY_CONFIGS[currentScenario.category].name} · Case {progress.currentScenario + 1}
                </p>
                <h2 className="text-lg sm:text-xl lg:text-2xl font-semibold text-gray-900 leading-tight sm:leading-snug px-2">
                  {currentScenario.title}
                </h2>
              </header>

              {/* Mobile-First Layout */}
              <div className="space-y-4 sm:space-y-6 lg:space-y-8">
                
                {/* Main Scenario Card */}
                <div className="w-full">
                  <ScenarioCard
                    title="Scenario"
                    context={currentScenario.context}
                    question={currentScenario.question}
                    showDetails={false}
                  >
                    <blockquote className="text-sm sm:text-base text-gray-700 italic border-l-4 border-gray-300 pl-3 sm:pl-4 leading-relaxed">
                      {currentScenario.situation}
                    </blockquote>
                  </ScenarioCard>
                </div>

                {/* Mobile Sidebar - Collapsible on small screens */}
                <div className="lg:hidden">
                  <details className="group">
                    <summary className="cursor-pointer bg-gray-50 border border-gray-200 rounded-lg p-3 sm:p-4 mb-3">
                      <div className="flex items-center justify-between">
                        <h3 className="text-sm sm:text-base font-medium text-gray-900">
                          Additional Context
                        </h3>
                        <svg 
                          className="w-4 h-4 text-gray-500 transform group-open:rotate-180 transition-transform duration-200" 
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </summary>
                    <div className="mt-3 space-y-4">
                      <div className="bg-white border border-gray-200 rounded-lg">
                        <StakeholderList 
                          stakeholders={currentScenario.stakeholders}
                          title="Key Stakeholders"
                        />
                      </div>
                      <div className="bg-white border border-gray-200 rounded-lg">
                        <LegalContext
                          legalContext={currentScenario.legalContext}
                          historicalContext={currentScenario.historicalContext}
                        />
                      </div>
                    </div>
                  </details>
                </div>

                {/* Desktop Layout */}
                <div className="hidden lg:grid lg:grid-cols-3 lg:gap-8 lg:items-start">
                  
                  {/* Main Content Area */}
                  <div className="lg:col-span-2">
                    <section>
                      <h3 className="text-lg font-medium text-gray-900 mb-4">
                        How would you respond?
                      </h3>
                      <div className="space-y-3">
                        {currentScenario.options.map((option, index) => (
                          <AdultOptionCard
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
                    </section>
                  </div>

                  {/* Desktop Sidebar */}
                  <aside className="space-y-6">
                    <StakeholderList 
                      stakeholders={currentScenario.stakeholders}
                      title="Key Stakeholders"
                    />
                    <LegalContext
                      legalContext={currentScenario.legalContext}
                      historicalContext={currentScenario.historicalContext}
                    />
                  </aside>
                </div>

                {/* Mobile Options Section */}
                <div className="lg:hidden">
                  <section>
                    <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-3 sm:mb-4 px-1">
                      How would you respond?
                    </h3>
                    <div className="space-y-2 sm:space-y-3">
                      {currentScenario.options.map((option, index) => (
                        <AdultOptionCard
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
                  </section>
                </div>
              </div>

              {/* Mobile-Optimized Navigation */}
              <div className="mt-6 sm:mt-8 lg:mt-10 pb-4 sm:pb-6">
                <Navigation
                  currentScenario={progress.currentScenario}
                  totalScenarios={scenarios.length}
                  canGoPrevious={navigation.canGoPrevious}
                  canGoNext={navigation.canGoNext}
                  onPrevious={navigation.goPrevious}
                  onNext={navigation.goNext}
                  nextButtonText={
                    progress.currentScenario === scenarios.length - 1
                      ? "Complete Assessment"
                      : "Next Case Study"
                  }
                />
              </div>
            </div>
          )}
        </LoadingState>
      </ModuleLayout>
    </ErrorBoundary>
  )
}