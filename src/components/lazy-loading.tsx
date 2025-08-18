import dynamic from 'next/dynamic'
import { LoadingState } from '@/components/common/loading-state'

// Lazy load heavy components for better performance
export const LazyTeenResultDisplay = dynamic(
  () => import('@/components/modules/teens/teen-result-display').then(mod => ({ default: mod.TeenResultDisplay })),
  {
    loading: () => <LoadingState isLoading={true} loadingText="Loading results..." />,
    ssr: false
  }
)

export const LazyAdultResultDisplay = dynamic(
  () => import('@/components/modules/adults/adult-result-display').then(mod => ({ default: mod.AdultResultDisplay })),
  {
    loading: () => <LoadingState isLoading={true} loadingText="Loading results..." />,
    ssr: false
  }
)

export const LazyPlatformPost = dynamic(
  () => import('@/components/modules/teens/platform-post').then(mod => ({ default: mod.PlatformPost })),
  {
    loading: () => <div className="animate-pulse bg-muted rounded-lg h-48" />,
    ssr: true
  }
)

export const LazyLegalContext = dynamic(
  () => import('@/components/modules/adults/legal-context').then(mod => ({ default: mod.LegalContext })),
  {
    loading: () => <div className="animate-pulse bg-muted rounded-lg h-32" />,
    ssr: true
  }
)