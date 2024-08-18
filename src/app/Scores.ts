
const TIMESTAMPS_COUNT = 50000;

const PROBABILITY_SCORE_CHANGED = 0.0001;

const PROBABILITY_HOME_SCORE = 0.45;

const OFFSET_MAX_STEP = 3;

type Score = {
    home: number;
    away: number;
};

type Stamp = {
    offset: number;
    score: Score;
};

const emptyScoreStamp: Stamp = {
    offset: 0,
    score: {
        home: 0,
        away: 0,
    },
};

export const generateStamps = (): Stamp[] => {
    const scoreStamps = Array(TIMESTAMPS_COUNT)
        .fill(emptyScoreStamp)
        .map(
            ((acc) => () => {
                const scoreChanged =
                    Math.random() > 1 - PROBABILITY_SCORE_CHANGED;
                const homeScoreChange =
                    scoreChanged && Math.random() < PROBABILITY_HOME_SCORE
                        ? 1
                        : 0;
                const awayScoreChange =
                    scoreChanged && !homeScoreChange ? 1 : 0;
                return {
                    offset: (acc.offset +=
                        Math.floor(Math.random() * OFFSET_MAX_STEP) + 1),
                    score: {
                        home: (acc.score.home += homeScoreChange),
                        away: (acc.score.away += awayScoreChange),
                    },
                };
            })(emptyScoreStamp)
        );

    return scoreStamps;
};
export const getScore = (gameStamps: Stamp[], offset: number): Score => {
    // Inicijalizujemo rezultat kao 0:0
    const currentScore: Score = { home: 0, away: 0 };

    // Prolazimo kroz niz pečata i tražimo rezultat na zadatom offsetu
    for (const stamp of gameStamps) {
        // Ako je trenutni pečat manji ili jednak zadatom offsetu,
        // ažuriramo trenutni rezultat.
        if (stamp.offset <= offset) {
            currentScore.home = stamp.score.home;
            currentScore.away = stamp.score.away;
        } else {
            // Ako naiđe pečat koji je veći od offseta, prekida se petlja
            break;
        }
    }

    return currentScore;
};


/* // Primer:
const gameStamps = generateStamps()
const currentOffset = 49000;

const currentScore = getScore(gameStamps, currentOffset);
console.log(currentScore);

console.log(gameStamps) */

  

