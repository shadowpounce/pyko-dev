import { FullPageProvider } from '@/components/layout/FullPageProvider'
import { careersSections } from './pages'

export default function CareersPage() {

    return (
        <>
            <FullPageProvider>
                {careersSections.map((section, index) => (
                    <section.component key={section.path} sectionIndex={index} />
                ))}
            </FullPageProvider>
        </>
    )
}
