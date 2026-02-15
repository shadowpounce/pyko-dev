import { animationConfig } from "@/config/animations.config";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { useRef } from "react";
type UseSplitTextProps = {
	animationDelay?: number | null
	splitType?: 'lines' | 'words' | 'chars'
	stagger?: number
	enabled?: boolean
}
export const useSplitText = <T extends HTMLParagraphElement>({ animationDelay = 1, enabled = true, splitType = 'lines', stagger = 0.1 }: UseSplitTextProps) => {
	const textRef = useRef<T>(null)
	useGSAP(() => {
		if (!textRef.current || !enabled) return
		SplitText.create(textRef.current, {
			type: splitType,
			autoSplit: true,
			onSplit(self) {
				return gsap.from(self.lines, {
					duration: 0.4,
					y: animationConfig.y.from,
					autoAlpha: 0,
					filter: 'blur(5px)',
					stagger: stagger,
					delay: animationDelay || 1
				});
			}
		});
	}, [animationDelay])
	return textRef
}