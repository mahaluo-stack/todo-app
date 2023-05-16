const letters: string = "abcdefghijklmnopqrstuvwxyz";
const ms: number = 40;

const getIterationValue = (string: string): number => {
    switch (string.length) {
        case 1:
            return 1 / 70;
        case 2:
            return 1 / 50;
        case 3:
        case 4:
            return 1 / 15;
        case 5:
        case 6:
        case 7:
            return 1 / 9;
        case 8:
        case 9:
        case 10:
            return 1 / 7
        default: return 1 / 3;
    }
}

export const HackElementText = (value: string, id: string): void => {
    const element: HTMLElement | null = document.getElementById(id);
    const iterationValue: number = getIterationValue(value);
    let iteration: number = 0;
    let interval: any;
    let valueLength: number = value.length === 1 ? 5 : value.length;

    clearInterval(interval);
    interval = setInterval(() => {
        element!.textContent = element!.textContent!.trim()
            .split("")
            .map((letter: string, index: number) => {
                if (index < iteration) {
                    return value[index];
                }

                return letters[Math.floor(Math.random() * 26)]
            })
            .join("");
        if (iteration >= valueLength) {
            clearInterval(interval);
        }

        iteration += iterationValue;
    }, ms);
}

export const HackInputText = (value: string, inputId: string): void => {
    const element: HTMLElement | null = document.getElementById(inputId);
    const input: HTMLInputElement = element as HTMLInputElement;
    const iterationValue: number = getIterationValue(value);
    let iteration: number = 0;
    let interval: any;
    clearInterval(interval);
    interval = setInterval(() => {
        input!.placeholder = input!.placeholder
            .split("")
            .map((letter: string, index: number) => {
                if (index < iteration) {
                    return value[index];
                }

                return letters[Math.floor(Math.random() * 26)]
            })
            .join("");

        if (iteration >= value.length) {
            clearInterval(interval);
        }

        iteration += iterationValue;
    }, ms);
}

export const HackAllText = (): void => {
    const arr: (HTMLParagraphElement | HTMLHeadingElement)[] = gatherVisibleTextElements();
    arr.forEach((element) => {
        const value = element.textContent;
        if (value) {

            const iterationValue: number = getIterationValue(value);
            let iteration: number = 0;
            let interval: any;

            clearInterval(interval);
            interval = setInterval(() => {
                element!.textContent = element!.textContent!.trim()
                    .split("")
                    .map((letter: string, index: number) => {
                        if (index < iteration) {
                            return value[index];
                        }

                        return letters[Math.floor(Math.random() * 26)]
                    })
                    .join("");
                if (iteration >= value.length) {
                    clearInterval(interval);
                }

                iteration += iterationValue;
            }, ms);
        }

    });
}

function gatherVisibleTextElements(): (HTMLParagraphElement | HTMLHeadingElement)[] {
    // Select all paragraphs and headers on the page
    const paragraphsAndHeaders = Array.from(document.querySelectorAll('p, h1, h2, h3, h4, h5, h6')) as (HTMLParagraphElement | HTMLHeadingElement)[];

    // Filter the elements that don't have any visible text
    const visibleParagraphsAndHeaders = paragraphsAndHeaders.filter((element: HTMLParagraphElement | HTMLHeadingElement) => {
      return element.textContent!.trim().length > 0 && // Element has text
        element.getBoundingClientRect().height > 0 && // Element is visible on the page
        element.getBoundingClientRect().width > 0;
    });
  
    // Return the array of visible paragraphs and headers
    return visibleParagraphsAndHeaders;
}