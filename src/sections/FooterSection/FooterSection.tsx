'use client'

import React, { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import { gsap } from 'gsap'
import { Section } from '@/components/ui/Section'
import { Container } from '@/components/ui/Container'
import { Button } from '@/components/ui/Button'
import {
    useSectionAnimationTrigger,
} from '@/hooks/useSectionAnimationTrigger'
import { animationConfig } from '@/config/animations.config'
import styles from './FooterSection.module.css'
import clsx from 'clsx'
import { Input } from '@/components/ui/Input/Input'

interface FooterSectionProps {
    sectionIndex: number
}

const BLUR_FROM = 10
const Y_FROM = 30
const DURATION = 0.6
const DELAY_BETWEEN = 0.15

export const FooterSection: React.FC<FooterSectionProps> = ({ sectionIndex }) => {
    const SECTION_INDEX = sectionIndex
    const START_DELAY = 1

    const baseDelay = useSectionAnimationTrigger({
        sectionIndex: SECTION_INDEX,
        startDelay: START_DELAY,
    })

    const [email, setEmail] = useState('')
    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value)
    }

    const [inputAnimated, setInputAnimated] = useState(false)

    // Refs: .footerText
    const logoRef = useRef<HTMLDivElement>(null)
    const titleRef = useRef<HTMLHeadingElement>(null)
    const descRef = useRef<HTMLParagraphElement>(null)
    const contactBtnRef = useRef<HTMLDivElement>(null)

    // Refs: .footerColumnLinks
    const exploreTitleRef = useRef<HTMLSpanElement>(null)
    const linkRefs = useRef<(HTMLAnchorElement | null)[]>([])

    // Refs: .contactsColumn
    const stayInTouchRef = useRef<HTMLSpanElement>(null)
    const subscribeLabelRef = useRef<HTMLLabelElement>(null)
    const inputWrapperRef = useRef<HTMLDivElement>(null)
    const emailInputRef = useRef<HTMLInputElement>(null)
    const followTitleRef = useRef<HTMLSpanElement>(null)
    const socialRefs = useRef<(HTMLDivElement | null)[]>([])

    const animateEl = (
        el: gsap.TweenTarget | null,
        delay: number,
        vars?: gsap.TweenVars
    ) => {
        if (!el) return
        gsap.fromTo(
            el,
            { opacity: 0, y: Y_FROM, filter: `blur(${BLUR_FROM}px)` },
            {
                opacity: 1,
                y: 0,
                filter: 'blur(0px)',
                duration: DURATION,
                delay,
                ease: animationConfig.easing.default,
                ...vars,
            }
        )
    }

    useEffect(() => {
        if (baseDelay == null) return

        const fromState = { opacity: 0, y: Y_FROM, filter: `blur(${BLUR_FROM}px)` }
        const setInitial = (el: gsap.TweenTarget | null) => {
            if (el) gsap.set(el, fromState)
        }

        setInitial(logoRef.current)
        setInitial(titleRef.current)
        setInitial(descRef.current)
        setInitial(exploreTitleRef.current)
        linkRefs.current.forEach((r) => setInitial(r))
        setInitial(stayInTouchRef.current)
        setInitial(subscribeLabelRef.current)
        setInitial(inputWrapperRef.current)
        setInitial(followTitleRef.current)
        socialRefs.current.forEach((r) => setInitial(r))
        if (emailInputRef.current) {
            gsap.set(emailInputRef.current, { width: 0 })
        }

        let idx = 0
        const d = () => baseDelay + idx++ * DELAY_BETWEEN

        animateEl(logoRef.current, d())
        animateEl(titleRef.current, d())
        animateEl(descRef.current, d())
        idx++ // Increment delay index to skip button but maintain sequence for links

        // .footerColumnLinks
        animateEl(exploreTitleRef.current, d())
        linkRefs.current.forEach((r) => animateEl(r, d()))

        // .contactsColumn: stay in touch, Subscribe label
        animateEl(stayInTouchRef.current, d())
        animateEl(subscribeLabelRef.current, d())

        // Input wrapper (opacity, y, blur)
        const inputWrapperDelay = d()
        animateEl(inputWrapperRef.current, inputWrapperDelay)

        // Input width 0 → max (after wrapper anim), measure when it's time
        const inputWidthStart = inputWrapperDelay + DURATION + 0.05
        const runInputWidth = () => {
            const wrapper = inputWrapperRef.current
            const input = emailInputRef.current
            if (!wrapper || !input) return
            gsap.to(input, {
                width: `100%`,
                duration: 1.25,
                ease: 'power2.inOut',
                overwrite: true,
                onComplete: () => {
                    setInputAnimated(true)
                }
            })
        }
        gsap.delayedCall(inputWidthStart, runInputWidth)

        // Follow us on, then social buttons (one by one)
        const followDelay = inputWidthStart + 0.5
        animateEl(followTitleRef.current, followDelay)
        socialRefs.current.forEach((r, i) => animateEl(r, followDelay + DELAY_BETWEEN + i * DELAY_BETWEEN))

        // Cleanup: kill all tweens on unmount
        return () => {
            const allRefs = [
                logoRef, titleRef, descRef, contactBtnRef, exploreTitleRef,
                stayInTouchRef, subscribeLabelRef, inputWrapperRef, emailInputRef, followTitleRef,
            ]
            allRefs.forEach(ref => {
                if (ref.current) gsap.killTweensOf(ref.current)
            })
            linkRefs.current.forEach(r => { if (r) gsap.killTweensOf(r) })
            socialRefs.current.forEach(r => { if (r) gsap.killTweensOf(r) })
        }
    }, [baseDelay])

    return (
        <Section className={styles.footer}>
            <Container className={styles.container}>
                <footer className={styles.footerWrapper}>
                    <div className={styles.footerText}>
                        <div ref={logoRef} className={clsx(styles.footerLogo, styles.footerAnimated)}>
                            <Image src="/images/icons/logo.svg" alt="Pyko" width={100} height={100} />
                        </div>
                        <h2 ref={titleRef} className={clsx(styles.footerTitle, styles.footerAnimated)}>
                            The future of <br />
                            <span>academic clarity</span>
                        </h2>
                        <p ref={descRef} className={clsx(styles.footerDescription, styles.footerAnimated)}>
                            Real-time awareness, adaptive intelligence, <br />
                            and personalized study systems for every learner.
                        </p>
                        <div>
                            <Button
                                variant="primary"
                                withArrow
                                animationDelay={baseDelay !== null ? (baseDelay + 3 * DELAY_BETWEEN) : null}
                            >
                                Contact us
                            </Button>
                        </div>
                    </div>
                    <div className={styles.footerColumns}>
                        <div className={clsx(styles.footerColumn, styles.footerColumnLinks)}>
                            <span ref={exploreTitleRef} className={clsx(styles.footerColumnTitle, styles.footerAnimated)}>explore</span>
                            <ul className={styles.footerList}>
                                <a ref={el => { linkRefs.current[0] = el }} href="/" className={clsx(styles.footerListItem, styles.footerAnimated)}>Home Page</a>
                                <a ref={el => { linkRefs.current[1] = el }} href="/about-us" className={clsx(styles.footerListItem, styles.footerAnimated)}>About Us</a>
                                <a ref={el => { linkRefs.current[2] = el }} href="/contacts" className={clsx(styles.footerListItem, styles.footerAnimated)}>Contacts</a>
                                <a ref={el => { linkRefs.current[3] = el }} href="/pricing" className={clsx(styles.footerListItem, styles.footerAnimated)}>Pricing</a>
                                <a ref={el => { linkRefs.current[4] = el }} href="/careers" className={clsx(styles.footerListItem, styles.footerAnimated)}>Careers</a>
                            </ul>
                        </div>
                        <div className={clsx(styles.footerColumn, styles.contactsColumn)}>
                            <div className={styles.footerEmail}>
                                <span ref={stayInTouchRef} className={clsx(styles.footerColumnTitle, styles.footerAnimated)}>stay in touch</span>
                                <div className={styles.footerEmailSubscription}>
                                    <label ref={subscribeLabelRef} className={clsx(styles.footerEmailSubscriptionLabel, styles.footerAnimated)}>
                                        Subscribe
                                    </label>
                                    <Input
                                        ref={inputWrapperRef}
                                        type="email"
                                        placeholder="Your email"
                                        value={email}
                                        onChange={handleEmailChange}
                                        withButton={true}
                                        inputRef={emailInputRef}
                                        className={styles.footerAnimated}
                                        animated={inputAnimated}
                                    />
                                </div>
                            </div>
                            <div className={styles.footerSocials}>
                                <span ref={followTitleRef} className={clsx(styles.footerColumnTitle, 'desktop-only', styles.footerAnimated)}>Follow us on</span>
                                <div className={styles.footerSocialsButtons}>
                                    <div ref={el => { socialRefs.current[0] = el }} className={clsx(styles.footerSocialsButton, styles.footerAnimated)}>
                                        <Image src="/images/icons/inst.svg" alt="Facebook" width={24} height={24} />
                                    </div>
                                    <div ref={el => { socialRefs.current[1] = el }} className={clsx(styles.footerSocialsButton, styles.footerAnimated)}>
                                        <Image src="/images/icons/x.svg" alt="X" width={24} height={24} />
                                    </div>
                                    <div ref={el => { socialRefs.current[2] = el }} className={clsx(styles.footerSocialsButton, styles.footerAnimated)}>
                                        <Image src="/images/icons/in.svg" alt="LinkedIn" width={24} height={24} />
                                    </div>
                                    <div ref={el => { socialRefs.current[3] = el }} className={clsx(styles.footerSocialsButton, styles.footerAnimated)}>
                                        <Image src="/images/icons/yt.svg" alt="YouTube" width={24} height={24} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </footer>
            </Container>
        </Section>
    )
}
