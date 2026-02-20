import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ParallaxBackground = () => {
  const containerRef = useRef(null);
  const svgRef = useRef(null);

  useEffect(() => {
    // gsap.context garante que todas as animações sejam revertidas ao desmontar o componente
    let ctx = gsap.context(() => {
      // Pequeno delay para garantir que o SVG foi renderizado antes de pegar o BBox
      setTimeout(() => {
        if (!svgRef.current) return;
        
        let speed = 100;
        let height = svgRef.current.getBBox().height;

        gsap.set("#h2-1", { opacity: 0 });
        gsap.set("#bg_grad", { attr: { cy: "-50" } });
        gsap.set(["#dinoL", "#dinoR"], { y: 80 });
        gsap.set("#dinoL", { x: -10 });

        const mm = gsap.matchMedia();
        mm.add("(max-width: 1922px)", () => {
            gsap.set(["#cloudStart-L", "#cloudStart-R"], { x: 10, opacity: 1 });
        });

        /* SCENE 1 */
        let scene1 = gsap.timeline();
        ScrollTrigger.create({
            animation: scene1,
            trigger: ".scrollElement",
            start: "top top",
            end: "45% 100%",
            scrub: 3
        });

        scene1.to("#h1-1", { y: 3 * speed, x: 1 * speed, scale: 0.9, ease: "power1.in" }, 0);
        scene1.to("#h1-2", { y: 2.6 * speed, x: -0.6 * speed, ease: "power1.in" }, 0);
        scene1.to("#h1-3", { y: 1.7 * speed, x: 1.2 * speed }, 0.03);
        scene1.to("#h1-4", { y: 3 * speed, x: 1 * speed }, 0.03);
        scene1.to("#h1-5", { y: 2 * speed, x: 1 * speed }, 0.03);
        scene1.to("#h1-6", { y: 2.3 * speed, x: -2.5 * speed }, 0);
        scene1.to("#h1-7", { y: 5 * speed, x: 1.6 * speed }, 0);
        scene1.to("#h1-8", { y: 3.5 * speed, x: 0.2 * speed }, 0);
        scene1.to("#h1-9", { y: 3.5 * speed, x: -0.2 * speed }, 0);
        scene1.to("#cloudsBig-L", { y: 4.5 * speed, x: -0.2 * speed }, 0);
        scene1.to("#cloudsBig-R", { y: 4.5 * speed, x: -0.2 * speed }, 0);
        scene1.to("#cloudStart-L", { x: -300 }, 0);
        scene1.to("#cloudStart-R", { x: 300 }, 0);
        scene1.to("#info", { y: 8 * speed }, 0);

        /* Bird   */
        gsap.fromTo(
            "#bird",
            { opacity: 1 },
            {
                y: -250, x: 800, ease: "power2.out",
                scrollTrigger: {
                    trigger: ".scrollElement", start: "15% top", end: "60% 100%", scrub: 4,
                    onEnter: () => gsap.to("#bird", { scaleX: 1, rotation: 0 }),
                    onLeave: () => gsap.to("#bird", { scaleX: -1, rotation: -15 })
                }
            }
        );

        /* Clouds  */
        let clouds = gsap.timeline();
        ScrollTrigger.create({ animation: clouds, trigger: ".scrollElement", start: "top top", end: "70% 100%", scrub: 1 });
        clouds.to("#cloud1", { x: 500 }, 0);
        clouds.to("#cloud2", { x: 1000 }, 0);
        clouds.to("#cloud3", { x: -1000 }, 0);
        clouds.to("#cloud4", { x: -700, y: 25 }, 0);

        /* Sun motion */
        let sun = gsap.timeline();
        ScrollTrigger.create({ animation: sun, trigger: ".scrollElement", start: "1% top", end: "2150 100%", scrub: 2 });
        sun.fromTo("#bg_grad", { attr: { cy: "-50" } }, { attr: { cy: "330" } }, 0);
        sun.to("#bg_grad stop:nth-child(2)", { attr: { offset: "0.15" } }, 0);
        sun.to("#bg_grad stop:nth-child(3)", { attr: { offset: "0.18" } }, 0);
        sun.to("#bg_grad stop:nth-child(4)", { attr: { offset: "0.25" } }, 0);
        sun.to("#bg_grad stop:nth-child(5)", { attr: { offset: "0.46" } }, 0);
        sun.to("#bg_grad stop:nth-child(6)", { attr: { stopColor: "#FF9171" } }, 0);

        /* SCENE 2  */
        let scene2 = gsap.timeline();
        ScrollTrigger.create({ animation: scene2, trigger: ".scrollElement", start: "15% top", end: "40% 100%", scrub: 3 });
        scene2.fromTo("#h2-1", { y: 500, opacity: 0 }, { y: 0, opacity: 1 }, 0);
        scene2.fromTo("#h2-2", { y: 500 }, { y: 0 }, 0.1);
        scene2.fromTo("#h2-3", { y: 700 }, { y: 0 }, 0.1);
        scene2.fromTo("#h2-4", { y: 700 }, { y: 0 }, 0.2);
        scene2.fromTo("#h2-5", { y: 800 }, { y: 0 }, 0.3);
        scene2.fromTo("#h2-6", { y: 900 }, { y: 0 }, 0.3);

        /* Bats */
        gsap.set("#bats", { transformOrigin: "50% 50%" });
        gsap.fromTo(
            "#bats", { opacity: 1, y: 400, scale: 0 },
            {
                y: 20, scale: 0.8, ease: "power3.out",
                scrollTrigger: {
                    trigger: ".scrollElement", start: "40% top", end: "70% 100%", scrub: 3,
                    onEnter: () => {
                        gsap.utils.toArray("#bats path").forEach((item, i) => {
                            gsap.to(item, { scaleX: 0.5, yoyo: true, repeat: 9, transformOrigin: "50% 50%", duration: 0.15, delay: 0.7 + i / 10 });
                        });
                        gsap.set("#bats", { opacity: 1 });
                    }
                }
            }
        );

        /* Sun increase */
        let sun2 = gsap.timeline();
        ScrollTrigger.create({ animation: sun2, trigger: ".scrollElement", start: "2000 top", end: "5000 100%", scrub: 2 });
        sun2.to("#sun", { attr: { offset: "1.4" } }, 0);
        sun2.to("#bg_grad stop:nth-child(2)", { attr: { offset: "0.7" } }, 0);
        sun2.to("#sun", { attr: { stopColor: "#ffff00" } }, 0);
        sun2.to("#lg4 stop:nth-child(1)", { attr: { stopColor: "#623951" } }, 0);
        sun2.to("#lg4 stop:nth-child(2)", { attr: { stopColor: "#261F36" } }, 0);
        sun2.to("#bg_grad stop:nth-child(6)", { attr: { stopColor: "#45224A" } }, 0);

        /* Transition (Scene2 -> Scene3) */
        gsap.set("#scene3", { y: height - 40, visibility: "visible" });
        let sceneTransition = gsap.timeline();
        ScrollTrigger.create({ animation: sceneTransition, trigger: ".scrollElement", start: "60% top", end: "bottom 100%", scrub: 3 });
        sceneTransition.to("#h2-1", { y: -height - 100, scale: 1.5, transformOrigin: "50% 50%" }, 0);
        sceneTransition.to("#bg_grad", { attr: { cy: "-80" } }, 0.0);
        sceneTransition.to("#bg2", { y: 0 }, 0);

        /* Scene 3 */
        let scene3 = gsap.timeline();
        ScrollTrigger.create({ animation: scene3, trigger: ".scrollElement", start: "70% 50%", end: "bottom 100%", scrub: 3 });
        scene3.fromTo("#h3-1", { y: 300 }, { y: -550 }, 0);
        scene3.fromTo("#h3-2", { y: 800 }, { y: -550 }, 0.03);
        scene3.fromTo("#h3-3", { y: 600 }, { y: -550 }, 0.06);
        scene3.fromTo("#h3-4", { y: 800 }, { y: -550 }, 0.09);
        scene3.fromTo("#h3-5", { y: 1000 }, { y: -550 }, 0.12);
        scene3.fromTo("#stars", { opacity: 0 }, { opacity: 0.5, y: -500 }, 0);
        scene3.fromTo("#arrow2", { opacity: 0 }, { opacity: 0.7, y: -710 }, 0.25);
        scene3.fromTo("#text2", { opacity: 0 }, { opacity: 0.7, y: -710 }, 0.3);

        scene3.to("#bg2-grad", { attr: { cy: 600 } }, 0);
        scene3.to("#bg2-grad", { attr: { r: 500 } }, 0);

        /* Falling star */
        gsap.set("#fstar", { y: -400 });
        let fstarTL = gsap.timeline();
        ScrollTrigger.create({
            animation: fstarTL, trigger: ".scrollElement", start: "4200 top", end: "6000 bottom", scrub: 2,
            onEnter: () => gsap.set("#fstar", { opacity: 1 }),
            onLeave: () => gsap.set("#fstar", { opacity: 0 })
        });
        fstarTL.to("#fstar", { x: -700, y: -250, ease: "power2.out" }, 0);

        // Twinkling stars
        [1,3,5,8,11,15,17,18,25,28,30,35,40,45,48].forEach((num, index) => {
             gsap.fromTo(`#stars path:nth-of-type(${num})`, 
                { opacity: 0.3 }, 
                { opacity: 1, duration: 0.3, repeat: -1, repeatDelay: (index % 3) + 0.5 }
             );
        });

      }, 100);
    }, containerRef);

    // Reseta o scroll para o topo ao recarregar a página
    window.onbeforeunload = function () {
      window.scrollTo(0, 0);
    };

    return () => ctx.revert(); // Cleanup do GSAP
  }, []);

  return (
    <div className="wrapper" ref={containerRef}>
      <svg ref={svgRef} className="parallax-bg" viewBox="0 0 750 500" preserveAspectRatio="xMidYMax slice">
        <defs>
          <linearGradient id="grad1" x1="-154.32" y1="263.27" x2="-154.32" y2="374.3" gradientTransform="matrix(-1, 0, 0, 1.36, 231.36, -100.14)" gradientUnits="userSpaceOnUse">
            <stop offset="0.07" stopColor="#9c536b" />
            <stop offset="0.98" stopColor="#d98981" />
          </linearGradient>
          <radialGradient id="bg_grad" cx="375" cy="-30" r="318.69" gradientUnits="userSpaceOnUse">
            <stop offset="0.1" stopColor="#F5C54E" id="sun" />
            <stop offset="0.1" stopColor="#FFDBA6" />
            <stop offset="0.0" stopColor="#F7BB93" />
            <stop offset="0.0" stopColor="#F2995E" />
            <stop offset="0.0" stopColor="#f07560" />
            <stop offset="0.8" stopColor="#FFAB93" />
          </radialGradient>
          <linearGradient id="grad2" x1="242.5" y1="356.25" x2="750" y2="356.25" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="#fbbd93" />
            <stop offset="0.98" stopColor="#c46976" />
          </linearGradient>
          <linearGradient id="grad3" x1="467.26" y1="500" x2="467.26" y2="225.47" gradientUnits="userSpaceOnUse">
            <stop offset="0.01" stopColor="#ffb8bd" />
            <stop offset="1" stopColor="#914d64" />
          </linearGradient>
          <linearGradient id="grad4" x1="216.56" y1="227.64" x2="191.14" y2="600.82" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="#70375a" />
            <stop offset="0.96" stopColor="#8a6e95" />
          </linearGradient>
          <linearGradient id="grad5" x1="1" y1="413.12" x2="340.58" y2="413.12" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="#433d6c" />
            <stop offset="1" stopColor="#392e54" />
          </linearGradient>
          <linearGradient id="grad6" x1="454.13" y1="295.96" x2="454.13" y2="498.93" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="#2b2850" />
            <stop offset="0.99" stopColor="#563a6a" />
          </linearGradient>
          <linearGradient id="grad7" x1="434.38" y1="391.96" x2="474.27" y2="516.33" gradientUnits="userSpaceOnUse">
            <stop offset="0.3" stopColor="#1c1b38" />
            <stop offset="0.38" stopColor="#201e3e" />
            <stop offset="0.9" stopColor="#383263" />
          </linearGradient>
          <linearGradient id="grad8" x1="259.18" y1="335.54" x2="213.65" y2="500.39" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="#0e0a1a" />
            <stop offset="0.3" stopColor="#100d1f" />
            <stop offset="0.64" stopColor="#17142c" />
            <stop offset="0.95" stopColor="#201f3f" />
          </linearGradient>
          <linearGradient id="grad9" x1="508.16" y1="321.39" x2="726.97" y2="623.69" gradientUnits="userSpaceOnUse">
            <stop offset="0.01" stopColor="#120e22" />
            <stop offset="1" stopColor="#221d42" />
          </linearGradient>

          <linearGradient id="lg4" x1="641.98" y1="274.9" x2="638.02" y2="334.36" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="#2c2c50" />
            <stop offset="1" stopColor="#434375" />
          </linearGradient>
          <linearGradient id="lg5" x1="172.37" y1="286.02" x2="171.33" y2="343.08" href="#lg4" />
          <linearGradient id="lg6" x1="505.71" y1="261.55" x2="504.61" y2="322.08" href="#lg4" />
          <linearGradient id="lg7" x1="301.32" y1="260.99" x2="295.66" y2="345.9" href="#lg4" />
          <linearGradient id="lg8" x1="375.59" y1="381.01" x2="373.3" y2="507.08" href="#lg4" />

          <radialGradient id="bg2-grad" cx="365.22" cy="500" r="631.74" gradientTransform="translate(750 552.6) rotate(180) scale(1 1.11)" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="hsla(349, 94%, 75%, 1)" />
            <stop offset="0.12" stopColor="hsla(342, 49%, 62%, 1)" />
            <stop offset="0.18" stopColor="hsla(328, 37%, 56%, 1)" />
            <stop offset="0.33" stopColor="hsla(281, 33%, 48%, 1)" />
            <stop offset="0.41" stopColor="hsla(268, 38%, 48%, 1)" />
            <stop offset="0.45" stopColor="hsla(266, 38%, 43%, 1)" />
            <stop offset="0.55" stopColor="hsla(261, 37%, 32%, 1)" />
            <stop offset="0.64" stopColor="hsla(253, 36%, 24%, 1)" />
            <stop offset="0.72" stopColor="hsla(244, 33%, 19%, 1)" />
            <stop offset="0.78" stopColor="hsla(240, 33%, 17%, 1)" />
          </radialGradient>

          <radialGradient id="fstar-grad" cx="1362.39" cy="-53.7" r="39.39" gradientTransform="matrix(0.89, -0.45, -0.45, -0.89, -473.7, 640.57)" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="#fff" />
            <stop offset="0.06" stopColor="#fff" stopOpacity="0.8" />
            <stop offset="0.12" stopColor="#fff" stopOpacity="0.62" />
            <stop offset="0.19" stopColor="#fff" stopOpacity="0.45" />
            <stop offset="0.26" stopColor="#fff" stopOpacity="0.31" />
            <stop offset="0.33" stopColor="#fff" stopOpacity="0.2" />
            <stop offset="0.41" stopColor="#fff" stopOpacity="0.11" />
            <stop offset="0.49" stopColor="#fff" stopOpacity="0.05" />
            <stop offset="0.59" stopColor="#fff" stopOpacity="0.01" />
            <stop offset="0.72" stopColor="#fff" stopOpacity="0" />
          </radialGradient>

          <linearGradient id="linear-gradient" x1="472" y1="461.56" x2="872.58" y2="461.56" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="#fd75a8" />
            <stop offset="1" stopColor="#5a2d81" />
          </linearGradient>
          <linearGradient id="linear-gradient-2" x1="214.61" y1="508.49" x2="166.09" y2="361.12" href="#linear-gradient" />
          <linearGradient id="linear-gradient-3" x1="57.65" y1="508.01" x2="448.08" y2="508.01" href="#linear-gradient" />
          <linearGradient id="linear-gradient-4" x1="193.48" y1="508.3" x2="761.05" y2="508.3" href="#linear-gradient" />
        </defs>

        <rect id="bg" width="750" height="500" opacity="0.8" fill="url(#bg_grad)" />

        <g id="clouds" fill="#fefefe">
          <path id="cloud4" transform="translate(600 0)" d="M402.34,341.68c9.9-10.24,23.76-7.43,36.05-5.48C448,332,458.88,329,468.9,334c-.95-7.91,8.65-14.92,15.9-11.61-3.34-11.77,13-13.9,20.53-8.34A13.53,13.53,0,0,1,522,310.16c2.64-18.11,27.85-24.13,38.38-9.17,3.54-5.51,12.12-6.88,17.2-2.74,6.59-43.22,70.78-27.93,65.83,12.62,14.7-4.43,32,6.72,34.08,21.93,5.76-2.23,29.28,1,21.76,9.26" />
          <path id="cloud3" transform="translate(600 0)" d="M382.94,363.16c-7-10.5-18.72-9.06-28.19-4.53-12.19-6.71-26.73-11.74-39.62-3.13,1-15.45-18-25.51-28-12.41-14.59-29.67-56.68-34.41-72-3.09-1.41,4-4.73,6.07-8.1,2.88-23.13-25.66-57.12-30.25-67.73,8.21-13.05-1.88-33.42-9.15-37.47,10.07a38.08,38.08,0,0,0-36.36,2.11" />
          <path id="cloud2" transform="translate(-600 0)" d="M506.86,233.56c9.62-3.21,23.27-4,33.88-2.17,0-5.7,10.4-6.68,14-3.58,10.32-12.45,29.93-5.12,40.08,0,10.06-6.52,27.67-9.72,33.93,2.42,5.53-.13,15.88-3.23,18.8,2.94a31.53,31.53,0,0,1,18.21.64" />
          <path id="cloud1" transform="translate(-600 0)" d="M402.18,271.3c-7.57-7.46-18.46-7.52-28.05-5.3-6.75-8.79-20.54-13.18-27.24-1.45-10.4-11.06-30.66-24.2-37.74-2.24a13.1,13.1,0,0,0-17.76,1.47c-11.23-25.69-58.46-41.29-64.24-4.06-9-8.26-20.15-2.62-27.47,4.4-11-2.87-22.18-7.58-31.72,2.7-8.44-.75-18.1-2.8-24.71,4.57" />
        </g>

        {/* SCENE 2 */}
        <g id="scene2">
          <g id="bats" style={{ opacity: 0 }}>
             <path d="M486.65,187a9.22,9.22,0,0,1-4.29,6.38l-.06-.06c-.05-1.13-.06-2.62-.94-3.52a3.34,3.34,0,0,1,.15,1.63,1.9,1.9,0,0,0-1.66-.09,3.31,3.31,0,0,1,.33-1.61c-1,.81-1.05,2.22-1.37,3.38-3.9-5.13-5.67-10.29-13.64-9.74,5.67,3.29,5.9,10.62,12.85,11.87.09,6.46,4.06,6.69,4.88.28l-.2.1.18-.35c0,.08,0,.16,0,.25,7-.48,8.08-7.73,14.09-10.38A22.64,22.64,0,0,0,486.65,187Z" fill="#112129" />
             <path d="M390.93,226.87c2.22,2.08,2,4.89.48,7.24,1.83-1.75,8.12,2.24,7,4.89,2.51-4.08,4.36.31,5.85,2.31,1.26-2.7,3.68-6,5.7-2.13-.93-2.73,5.66-6.2,7.34-4.32-3.67-5.08,3.49-10.18,7.21-7.31-.39-.7-4.61-4.33-12.39-3.17,3.63,5.77-3.22,9.07-5.56,9.51a2.88,2.88,0,0,0-.64-2.28c-.36.36-.32,1.06-.52,1.48a7.6,7.6,0,0,0-2.13-.14c0-.42-.15-1.09-.5-1.32a4,4,0,0,0-.68,2.32c-2.39-.72-8.67-4.51-4.66-9.87-7.67-1.78-12.17,1.51-12.61,2.17C385.25,225.74,389.24,225.21,390.93,226.87Z" fill="#112129" />
             <path d="M430.89,152.88c-4.51,1.05,1.45-4.11-8.29-4.45-.47-4.18-5.81-4.39-8.89-5.1,2.82-2.94,8.14-3.47,12.12-3.3,2.3.49,6.16.37,7.5,2.31-1,3,4.29,12,5.26,5.94,2.05,3.21,5,.12,4.19,2-.45.53-1,2.54.08,2.34,4.46-.88,5.75-6.35,8.69-8.63,4.73-.13,12,1,13.29,6.25-5.84-2.77-7.67-2.4-10.21,2.8-2.93-.77-5.74.92-7.26,3.33-3.3-2.2-7.59.35-11,2.2.05-1.76-.79-4.15-2.71-4.6C433.18,152.94,431.88,152.9,430.89,152.88Z" fill="#112129" fillRule="evenodd" />
             <path d="M538.33,214.5s-2.52,6.57,2.07,7.47c-1.53.45-4.23,3.88-2.25,6.85-2.2-1.83-10.48,6.4-8.65,8.74-1.4-2.25-4.54-1.85-4.77,1-1.07-3.42-2.36-1.61-2.34.63-1.16-3.75-4.22-1.39-4.6.9-.4-5.23-9.49-5.18-11.89-3.51,1.45-2.79-2-6.28-4.59-5.95,0,0,1.62-5.85-3.43-7.48,6.16-3.41,16.13,10,22.07,8.92a8.47,8.47,0,0,1-.9-4.23l1.53,1.71,1.27-.09,1-2.7C525.28,238.88,530.76,216.88,538.33,214.5Z" fill="#112129" />
             <path d="M458.17,279.73c3.54.59,5.51,4.7,2.22,7.27,2.87-.72,4,4.71,2.47,5.94,4.88-1.34,9.07,5.6,8.25,9.17,3-1.07,4.18,4.15,3.52,5.52.89-1.82,3.82-5.49,5.73-1.71,2.43-5,7.84-6,12.35-3.64-1.94-4.42,4-5.2,6.22-3.91-1.29-3.74,1.35-5.73,4.78-4.66-7.88-8.5-15.53-.91-22.4,2.76a30.2,30.2,0,0,0,1-3.23l-4.33,3-1.56-5-.89,2.8C471.29,286,471.52,277,458.17,279.73Z" fill="#112129" />
          </g>

          <g id="hills2">
             <path id="h2-6" d="M524.28,418.82c6.36,0,80.19-14.81,103.12-36.53S655.28,345.8,679,359.64s33.69,18.54,46.63,18.82a158.62,158.62,0,0,1,23.88,2.4V447L632,458.92Z" fill="url(#lg4)" />
             <path id="h2-5" d="M294.06,498.2l49.09-66.93s-64-6.48-93.59-31.29-63.47-49.78-87.15-41.46-81.7,4.44-98.73,15S.1,387.08.1,387.08l.37,60.18L209.75,498.2Z" fill="url(#lg5)" />
             <path id="h2-4" d="M264.94,449.2s61-16.39,94.07-37.28,61.37-37.2,73.53-36.12,69.9-40,80.18-42.62,13.55-.37,29,1.85,22-5.27,34.52,6.39,43.29,34.86,75.51,48.52c25.88,11,91.48,28.88,91.48,28.88l-31.58,67.73-326.93,9.27Z" fill="url(#lg6)" />
             <path id="h2-3" d="M.47,469.58V420s113.73-2.74,171.72-26.68,101.69-72.29,134.53-52,31.37-18.48,61.9,13.28S446.68,393.48,478,406.86s113.08,26.06,113.08,26.06l-59.28,53.4L272.55,485Z" fill="url(#lg7)" />
             <path id="h2-2" d="M749.55,500V398.27l-38.48-6.67s-29.86,12.13-63,11.53-39.61-7.26-70.33-13.41-72.58,21.4-105.61,21.4-75.5-17.78-110.64-17.78c-24.85,0-90.08,20.12-110.82,18.48s-51.11-20.42-82-6.26S.47,409.26.47,409.26V500Z" fill="url(#lg8)" />
             <path id="h2-1" style={{ opacity: 0 }} d="M746.51,371.43c-.18-1,1.74,1.28,2.2.27... (path encurtado apenas nesta resposta, no arquivo real você usará o path completo que fornecerei no código final) ...623.4,378,623.81,378.06Z" fill="#1d1d3a" />
          </g>
        </g>

        {/* Scene 3 */}
        <g id="scene3" style={{ visibility: 'hidden' }}>
          <rect id="bg2" y="-59.8" width="750" height="612.4" transform="translate(750 492.8) rotate(180)" fill="url(#bg2-grad)" />

          <g id="fstar">
            <image width="707" height="429" transform="translate(728.46 16.5) scale(0.24)" href="https://i.ibb.co/TWfhqRG/fstar.png" />
            <circle cx="768.6" cy="78.72" r="39.39" transform="translate(64.22 396.2) rotate(-30.11)" fill="url(#fstar-grad)" style={{ mixBlendMode: 'overlay' }} />
          </g>

          {/* ... Estrelas ... */}
          <g id="stars" fill="#fff" style={{ opacity: 0 }}>
             <path d="M699.71,128.24a1,1,0,1,1-1-1A1,1,0,0,1,699.71,128.24Z" />
             {/* Adicione todos os paths/circles de estrelas aqui, a sintaxe padrão do JSX vai funcionar bem para eles */}
          </g>

          <g id="hills3" transform="translate(0, -110)">
            <g id="info2">
              <polygon id="arrow2" points="395.5 482.2 393.4 484.3 375.2 466.1 357 484.3 354.9 482.2 375.2 461.9 395.5 482.2" style={{ fill: '#fff', stroke: '#231f20', strokeMiterlimit: 10, strokeWidth: '0.5px' }} />
              <path id="text2" d="m271.8,526.2... " style={{ fill: '#fff', stroke: '#231f20', strokeMiterlimit: 10, strokeWidth: '0.5px' }} />
            </g>
            <polygon id="h3-5" points="756.3 330.5..." style={{ fill: 'url(#linear-gradient)', mixBlendMode: 'multiply' }} />
            <path id="h3-4" d="m453.1,471..." style={{ fill: 'url(#linear-gradient-2)', mixBlendMode: 'multiply' }} />
            <path id="h3-3" d="m369.3,490.9..." style={{ fill: 'url(#linear-gradient-3)', mixBlendMode: 'multiply' }} />
            <path id="h3-2" d="m756.1,490.9..." style={{ fill: 'url(#linear-gradient-4)', mixBlendMode: 'multiply' }} />
            
            <g id="h3-1">
              {/* O path completo da cena 3 */}
            </g>
          </g>
        </g>

        {/* SCENE 1 */}
        <g id="scene1">
          <g id="hills1">
             <path id="cloudStart-L" style={{ fill: '#fff', opacity: 0 }} d="..." />
             <path id="cloudStart-R" style={{ fill: '#fff', opacity: 0 }} d="..." />
             <path id="cloudsBig-L" style={{ fill: '#fff', opacity: 0.5 }} d="..." />
             <path id="cloudsBig-R" style={{ fill: '#fff', opacity: 0.5 }} d="..." />
             
             {/* h1-9 até h1-1 com as cores e gradients */}
             <path id="h1-9" d="..." fill="url(#grad1)" />
             {/* Adicione os outros paths H1-X aqui do original */}
             
             <g id="info">
               <polygon id="arrow" points="..." fill="#fff" stroke="#231f20" strokeMiterlimit="10" strokeWidth="0.5" />
               <path id="text" d="..." fill="#fff" stroke="#231f20" strokeMiterlimit="10" strokeWidth="0.5" />
             </g>
             
             <path id="bird" style={{ opacity: 0 }} d="..." fill="#16122b" />
          </g>
        </g>
      </svg>
      
      {/* O container de Scroll de 6000px de altura para forçar o trigger do GSAP */}
      <div className="scrollElement" style={{ position: 'absolute', height: '6000px', width: '100%', top: 0, zIndex: 4 }} />
      
    </div>
  );
};

export default ParallaxBackground;