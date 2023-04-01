import { INTENTS } from './intents/intents';

const extractIntent = (request): string | null => {
    return request.query.intent !== null && request.query.intent !== undefined
        ? request.query.intent
        : null;
}

const selectRandomResponse = (responseArray: string[]): string => {
    return responseArray[Math.floor(Math.random() * responseArray.length)];
}

const respondToUnknownIntent = (): string => {
    const unkownIntentResponses: string[] = [
        'Ich konnte Sie leider nicht verstehen.',
        'Ich habe Sie leider nicht verstanden.',
        'Ich habe Sie leider nicht verstanden. Können Sie das noch einmal wiederholen?',
        'Entschuldigen Sie, ich habe Sie leider nicht verstanden.',
        'Entschuldigung, ich konnte Sie nicht verstehen',
        'Es scheint ein Problem vorzuliegen, ich konnte Sie leider nicht verstehen.',
    ]

    return selectRandomResponse(unkownIntentResponses);
}

const filterResponseByIntent = (intent: string): string => {
    switch (intent) {
        case INTENTS.GREETING_TIME_PHRASE: return determineGreetingTimePhrase();
        default: return respondToUnknownIntent();
    }
}

const determineGreetingTimePhrase = (): string => {
    const date = new Date();
    const currentHour = date.getHours();

    const morningGreeting: string[] = ['Guten Morgen!','Morgen','Einen schönen guten Morgen'];
    const afternoonGreeting: string[] = ['Guten Tag!','Tag','Einen schönen guten Tag'];
    const eveningGreeting: string[] = ['Guten Abend!','Abend','Einen schönen guten Abend'];
    const nightGreeting: string[] = ['Gute Nacht!','So spät noch auf?','Einen schönen guten Abend'];

    if (currentHour >= 6 && currentHour < 12) {
        return selectRandomResponse(morningGreeting);
    }

    if (currentHour >= 12 && currentHour < 18) {
        return selectRandomResponse(afternoonGreeting);
    }

    if (currentHour >= 18 && currentHour < 22){
        return selectRandomResponse(eveningGreeting);
    }

    return selectRandomResponse(nightGreeting);
}

export const respond = (request): string => {
    const intent = extractIntent(request);

    if (intent === null) {
        return respondToUnknownIntent();
    }

    const answer: string = filterResponseByIntent(intent);

    return answer;
}
