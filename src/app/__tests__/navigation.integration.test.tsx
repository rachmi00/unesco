import StoryModule from '../story/page'
import AdultsModule from '../adults/page'
import TeensModule from '../teens/page'
import * as fs from 'fs'
import * as path from 'path'

describe('Homepage Navigation Integration', () => {
  it('verifies story route exists in Next.js app router structure', () => {
    // Test that the story route file exists and exports a default component
    expect(StoryModule).toBeDefined()
    expect(typeof StoryModule).toBe('function')
  })

  it('verifies story module follows same page pattern as other modules', () => {
    // Test that story page structure matches adults and teens pages
    expect(typeof StoryModule).toBe('function')
    expect(typeof AdultsModule).toBe('function')
    expect(typeof TeensModule).toBe('function')
  })

  it('verifies story route is accessible at /story path', () => {
    // This test verifies the file structure supports the /story route
    const storyPagePath = path.join(process.cwd(), 'src/app/story/page.tsx')
    expect(fs.existsSync(storyPagePath)).toBe(true)
  })

  it('verifies story module exports are consistent with other modules', () => {
    // Test that story module has the same export structure
    expect(StoryModule).toBeDefined()
    expect(typeof StoryModule).toBe('function')
  })
})