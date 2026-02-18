import { FullPageProvider } from '@/components/layout/FullPageProvider'
import { investorsSections } from './pages'

export default function InvestorsPage() {

    return (
        <>
            <FullPageProvider>
                {investorsSections.map((section, index) => (
                    <section.component key={section.path} sectionIndex={index} />
                ))}
            </FullPageProvider>
        </>
    )
}
