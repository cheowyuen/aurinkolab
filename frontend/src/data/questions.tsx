import { Question } from "../EntryTest";

const allQuestions: Question[] = [
    {
        questionId: 1,
        questionNo: 1,
        question: "What is electrical voltage?",
        answers: [
            {
                answerId: 1,
                answer: "a. Current in an electrical circuit",
                isCorrect: false
            },
            {
                answerId: 2,
                answer: "b. Potential difference between two points",
                isCorrect: true
            },
            {
                answerId: 3,
                answer: "c. Number of electrons in a conductor",
                isCorrect: false
            },
            {
                answerId: 4,
                answer: "d. Conductor resistance",
                isCorrect: false
            }
        ]
    },
    {
        questionId: 2,
        questionNo: 2,
        question: "What is electric current and how is it related to voltage?",
        answers: [
            {
                answerId: 5,
                answer: "a. Current - potential difference between two points",
                isCorrect: false
            },
            {
                answerId: 6,
                answer: "b. Current - the number of electrons in a conductor",
                isCorrect: true
            },
            {
                answerId: 7,
                answer: "c. Current - magnetic field strength",
                isCorrect: false
            },
            {
                answerId: 8,
                answer: "d. Current - gravitational force of electrons",
                isCorrect: false
            }
        ]
    },
    {
        questionId: 3,
        questionNo: 3,
        question: "What quantities can affect the voltage in circuits?",
        answers: [
            {
                answerId: 9,
                answer: "a. Temperature and humidity",
                isCorrect: false
            },
            {
                answerId: 10,
                answer: "b. Conductor length and cross-section",
                isCorrect: true
            },
            {
                answerId: 11,
                answer: "c. Ligh intensity",
                isCorrect: false
            },
            {
                answerId: 12,
                answer: "d. Conductor color",
                isCorrect: false
            }
        ]
    }
    /*{
        questionId: 4,
        questionNo: 4,
        question: "Who introduced the concept of tension and in what context?",
        answers: [
            {
                answerId: 13,
                answer: "a. Mikhail Lomonosov, in the context of atomic physics",
                isCorrect: false
            },
            {
                answerId: 14,
                answer: "b. Alexander Volt, in the context of electrodynamics",
                isCorrect: false
            },
            {
                answerId: 15,
                answer: "c. Georg Ohm, in the context of electrical circuits",
                isCorrect: true
            },
            {
                answerId: 16,
                answer: "d. Nikola Tesla, in the context of alternative energy",
                isCorrect: false
            }
        ]
    },
    {
        questionId: 5,
        questionNo: 5,
        question: "What is voltage in DC circuits?",
        answers: [
            {
                answerId: 17,
                answer: "a. Specific work done by the electric field",
                isCorrect: true
            },
            {
                answerId: 18,
                answer: "b. Sum of all resistances in the circuit",
                isCorrect: false
            },
            {
                answerId: 19,
                answer: "c. The amount of electricity in the conductor",
                isCorrect: false
            },
            {
                answerId: 20,
                answer: "d. Maximum circuit current",
                isCorrect: false
            }
        ]
    },
    {
        questionId: 6,
        questionNo: 6,
        question: "In what units is voltage measured in Finland?",
        answers: [
            {
                answerId: 21,
                answer: "a. Volts",
                isCorrect: true
            },
            {
                answerId: 22,
                answer: "b. Amps",
                isCorrect: false
            },
            {
                answerId: 23,
                answer: "c. Kilowatts",
                isCorrect: false
            },
            {
                answerId: 24,
                answer: "d. Ohms",
                isCorrect: false
            }
        ]
    },
    {
        questionId: 7,
        questionNo: 7,
        question: "How is instantaneous voltage related to the amplitude value of voltage?",
        answers: [
            {
                answerId: 25,
                answer: "a. Instantaneous voltage is twice the amplitude voltage",
                isCorrect: false
            },
            {
                answerId: 26,
                answer: "b. Instantaneous voltage equals peak voltage",
                isCorrect: true
            },
            {
                answerId: 27,
                answer: "c. Instantaneous voltage is equal to half the amplitude",
                isCorrect: false
            },
            {
                answerId: 28,
                answer: "d. Instantaneous voltage is equal to the square of the amplitude",
                isCorrect: false
            }
        ]
    },
    {
        questionId: 8,
        questionNo: 8,
        question: "What are the standards and typical voltage values?",
        answers: [
            {
                answerId: 29,
                answer: "a. Voltage varies depending on the time of day",
                isCorrect: false
            },
            {
                answerId: 30,
                answer: "b. Standard voltage in home networks is 220 V",
                isCorrect: true
            },
            {
                answerId: 31,
                answer: "c. Voltage depends on the phase of the moon",
                isCorrect: false
            },
            {
                answerId: 32,
                answer: "d. Voltage is constantly changing",
                isCorrect: false
            }
        ]
    },
    {
        questionId: 9,
        questionNo: 9,
        question: "What is electric current?",
        answers: [
            {
                answerId: 33,
                answer: "a. Electron flow in a conductor",
                isCorrect: true
            },
            {
                answerId: 34,
                answer: "b. Potential difference between two points",
                isCorrect: false
            },
            {
                answerId: 35,
                answer: "c. Number of electrons in an atom",
                isCorrect: false
            },
            {
                answerId: 36,
                answer: "d. Change in conductor temperature",
                isCorrect: false
            }
        ]
    },
    {
        questionId: 10,
        questionNo: 10,
        question: "How is electric current related to voltage?",
        answers: [
            {
                answerId: 37,
                answer: "a. The current depends on the length of the conductor",
                isCorrect: false
            },
            {
                answerId: 38,
                answer: "b. Current is proportional to potential difference",
                isCorrect: true
            },
            {
                answerId: 39,
                answer: "c. Current is inversely proportional to conductor resistance",
                isCorrect: false
            },
            {
                answerId: 40,
                answer: "d. Current independent of voltage",
                isCorrect: false
            }
        ]
    },
    {
        questionId: 11,
        questionNo: 11,
        question: "How is electric current measured in SI?",
        answers: [
            {
                answerId: 41,
                answer: "a. Amps",
                isCorrect: true
            },
            {
                answerId: 42,
                answer: "b. Volts",
                isCorrect: false
            },
            {
                answerId: 43,
                answer: "c. Ohms",
                isCorrect: false
            },
            {
                answerId: 44,
                answer: "d. Hertz",
                isCorrect: false
            }
        ]
    },
    {
        questionId: 12,
        questionNo: 12,
        question: "What factors influence the strength of electric current in a conductor?",
        answers: [
            {
                answerId: 45,
                answer: "a. Conductor length and material",
                isCorrect: false
            },
            {
                answerId: 46,
                answer: "b. Conductor color and temperature",
                isCorrect: false
            },
            {
                answerId: 47,
                answer: "c. Moon phase and solar activity",
                isCorrect: false
            },
            {
                answerId: 48,
                answer: "d. Conductor cross-sectional area and applied voltage",
                isCorrect: true
            }
        ]
    },
    {
        questionId: 13,
        questionNo: 13,
        question: "Who proposed the theory of the movement of electric current in a conductor?",
        answers: [
            {
                answerId: 49,
                answer: "a. Nikola Tesla",
                isCorrect: false
            },
            {
                answerId: 50,
                answer: "b. Alexander Graham Bell",
                isCorrect: false
            },
            {
                answerId: 51,
                answer: "c. Michael Faraday",
                isCorrect: true
            },
            {
                answerId: 52,
                answer: "d. James Clerk Maxwell",
                isCorrect: false
            }
        ]
    },
    {
        questionId: 14,
        questionNo: 14,
        question: "What types of electric current exist?",
        answers: [
            {
                answerId: 53,
                answer: "a. Direct and alternating current",
                isCorrect: true
            },
            {
                answerId: 54,
                answer: "b. Alternative and direct current",
                isCorrect: false
            },
            {
                answerId: 55,
                answer: "c. Cyclic and intermittent current",
                isCorrect: false
            },
            {
                answerId: 56,
                answer: "d. Plasma and ion current",
                isCorrect: false
            }
        ]
    },
    {
        questionId: 15,
        questionNo: 15,
        question: "In what units is electric current measured in Finland?",
        answers: [
            {
                answerId: 57,
                answer: "a. Volts",
                isCorrect: false
            },
            {
                answerId: 58,
                answer: "b. Amps",
                isCorrect: true
            },
            {
                answerId: 59,
                answer: "c. Kilowatts",
                isCorrect: false
            },
            {
                answerId: 60,
                answer: "d. Ohms",
                isCorrect: false
            }
        ]
    },
    {
        questionId: 16,
        questionNo: 16,
        question: "What is direct current?",
        answers: [
            {
                answerId: 61,
                answer: "a. Current whose frequency varies with time",
                isCorrect: false
            },
            {
                answerId: 62,
                answer: "b. Current, the direction of which does not change with time",
                isCorrect: true
            },
            {
                answerId: 63,
                answer: "c. Current varying periodically over time",
                isCorrect: false
            },
            {
                answerId: 64,
                answer: "d. Current whose driving force is constant",
                isCorrect: false
            }
        ]
    },
    {
        questionId: 17,
        questionNo: 17,
        question: "What is an electric battery?",
        answers: [
            {
                answerId: 65,
                answer: "a. Device for generating electric current",
                isCorrect: false
            },
            {
                answerId: 66,
                answer: "b. Electrical energy storage device",
                isCorrect: true
            },
            {
                answerId: 67,
                answer: "c. Device for converting mechanical energy into electrical energy",
                isCorrect: false
            },
            {
                answerId: 68,
                answer: "d. Electrical signal cleaning device",
                isCorrect: false
            }
        ]
    },
    {
        questionId: 18,
        questionNo: 18,
        question: "How does an electric battery work?",
        answers: [
            {
                answerId: 69,
                answer: "a. Produces electric current from chemical energy",
                isCorrect: true
            },
            {
                answerId: 70,
                answer: "b. Produces chemical energy from electric current",
                isCorrect: false
            },
            {
                answerId: 71,
                answer: "c. Produces mechanical energy from electric current",
                isCorrect: false
            },
            {
                answerId: 72,
                answer: "d. Produces electric current from mechanical energy",
                isCorrect: false
            }
        ]
    },
    {
        questionId: 19,
        questionNo: 19,
        question: "What are the main components of an electric battery?",
        answers: [
            {
                answerId: 73,
                answer: "a. Anode, cathode, electrolyte",
                isCorrect: true
            },
            {
                answerId: 74,
                answer: "b. Solar panel, inverter, battery",
                isCorrect: false
            },
            {
                answerId: 75,
                answer: "c. Rotor, stator, windings",
                isCorrect: false
            },
            {
                answerId: 76,
                answer: "d. Commutator, brushes, armature",
                isCorrect: false
            }
        ]
    },
    {
        questionId: 20,
        questionNo: 20,
        question: "What types of electric batteries are there?",
        answers: [
            {
                answerId: 77,
                answer: "a. Lithium, nickel-cadmium, lead-acid",
                isCorrect: true
            },
            {
                answerId: 78,
                answer: "b. Hydrogen, helium, oxygen",
                isCorrect: false
            },
            {
                answerId: 79,
                answer: "c. Silver-zinc, aluminum-iron, copper-nickel",
                isCorrect: false
            },
            {
                answerId: 80,
                answer: "d. Titanium, fluoride, chloride",
                isCorrect: false
            }
        ]
    },
    {
        questionId: 21,
        questionNo: 21,
        question: "What are the benefits of using lithium batteries?",
        answers: [
            {
                answerId: 81,
                answer: "a. Low cost",
                isCorrect: false
            },
            {
                answerId: 82,
                answer: "b. High energy density and low weight",
                isCorrect: true
            },
            {
                answerId: 83,
                answer: "c. High temperature resistance",
                isCorrect: false
            },
            {
                answerId: 84,
                answer: "d. Easy to dispose of",
                isCorrect: false
            }
        ]
    },
    {
        questionId: 22,
        questionNo: 22,
        question: "What factors can affect the performance of an electric battery?",
        answers: [
            {
                answerId: 85,
                answer: "a. Ambient temperature and charge level",
                isCorrect: true
            },
            {
                answerId: 86,
                answer: "b. Case color and battery shape",
                isCorrect: false
            },
            {
                answerId: 87,
                answer: "c. Moon phase and solar activity",
                isCorrect: false
            },
            {
                answerId: 88,
                answer: "d. Conductor length and material",
                isCorrect: false
            }
        ]
    },
    {
        questionId: 23,
        questionNo: 23,
        question: "What is the average lifespan of an electric battery?",
        answers: [
            {
                answerId: 89,
                answer: "a. 1-2 years",
                isCorrect: false
            },
            {
                answerId: 90,
                answer: "b. 5-7 years",
                isCorrect: true
            },
            {
                answerId: 91,
                answer: "c. 10-15 years",
                isCorrect: false
            },
            {
                answerId: 92,
                answer: "d. 20-25 years",
                isCorrect: false
            }
        ]
    },
    {
        questionId: 24,
        questionNo: 24,
        question: "What is the main purpose of using electric batteries in modern technology?",
        answers: [
            {
                answerId: 93,
                answer: "a. Increasing the capacity of electrical networks",
                isCorrect: false
            },
            {
                answerId: 94,
                answer: "b. Increased energy efficiency of devices",
                isCorrect: true
            },
            {
                answerId: 95,
                answer: "c. Increase data transfer speed",
                isCorrect: false
            },
            {
                answerId: 96,
                answer: "d. Increase in operating temperature of devices",
                isCorrect: false
            }
        ]
    },
    {
        questionId: 25,
        questionNo: 25,
        question: "What methods of recycling electric batteries are there?",
        answers: [
            {
                answerId: 97,
                answer: "a. Complete disposal without the possibility of recycling",
                isCorrect: false
            },
            {
                answerId: 98,
                answer: "b. Recycling and reuse of materials",
                isCorrect: true
            },
            {
                answerId: 99,
                answer: "c. Disposal in special landfills",
                isCorrect: false
            },
            {
                answerId: 100,
                answer: "d. Incineration in specialized furnaces",
                isCorrect: false
            }
        ]
    },
    {
        questionId: 26,
        questionNo: 26,
        question: "What safety precautions are recommended when working with electric batteries?",
        answers: [
            {
                answerId: 101,
                answer: "a. Never charge batteries",
                isCorrect: false
            },
            {
                answerId: 102,
                answer: "b. Use only original chargers",
                isCorrect: false
            },
            {
                answerId: 103,
                answer: "c. Recharge batteries until completely discharged",
                isCorrect: false
            },
            {
                answerId: 104,
                answer: "d. Do not expose batteries to mechanical damage",
                isCorrect: true
            }
        ]
    },
    {
        questionId: 27,
        questionNo: 27,
        question: "What is a solar battery?",
        answers: [
            {
                answerId: 105,
                answer: "a. Device for heating water using solar radiation",
                isCorrect: false
            },
            {
                answerId: 106,
                answer: "b. Device for converting solar energy into electrical energy",
                isCorrect: true
            },
            {
                answerId: 107,
                answer: "c. Air filtration device using solar rays",
                isCorrect: false
            },
            {
                answerId: 108,
                answer: "d. Device for generating solar heat for space heating",
                isCorrect: false
            }
        ]
    },
    {
        questionId: 28,
        questionNo: 28,
        question: "How does a solar battery work?",
        answers: [
            {
                answerId: 109,
                answer: "a. Converts electrical energy into solar energy",
                isCorrect: false
            },
            {
                answerId: 110,
                answer: "b. Converts mechanical energy into solar energy",
                isCorrect: false
            },
            {
                answerId: 111,
                answer: "c. Converts solar energy into thermal energy",
                isCorrect: false
            },
            {
                answerId: 112,
                answer: "d. Converts solar energy into electrical energy",
                isCorrect: true
            }
        ]
    },
    {
        questionId: 29,
        questionNo: 29,
        question: "What types of solar panels are there?",
        answers: [
            {
                answerId: 113,
                answer: "a. Photothermal and photovoltaic",
                isCorrect: false
            },
            {
                answerId: 114,
                answer: "b. Solar and wind generators",
                isCorrect: false
            },
            {
                answerId: 115,
                answer: "c. Passive and active",
                isCorrect: false
            },
            {
                answerId: 116,
                answer: "d. Film and crystalline",
                isCorrect: true
            }
        ]
    },
    {
        questionId: 30,
        questionNo: 30,
        question: "What is the difference between film solar cells and crystalline solar cells?",
        answers: [
            {
                answerId: 117,
                answer: "a. Film ones are more effective in cloudy weather",
                isCorrect: false
            },
            {
                answerId: 118,
                answer: "b. Crystalline are more flexible and easier to install",
                isCorrect: true
            },
            {
                answerId: 119,
                answer: "c. Film produces more electricity in low light",
                isCorrect: false
            },
            {
                answerId: 120,
                answer: "d. Crystalline ones have a longer service life",
                isCorrect: false
            }
        ]
    },
    {
        questionId: 31,
        questionNo: 31,
        question: "What factors can affect the performance of a solar panel?",
        answers: [
            {
                answerId: 121,
                answer: "a. Battery type and capacity",
                isCorrect: false
            },
            {
                answerId: 122,
                answer: "b. Ambient temperature and level of solar activity",
                isCorrect: true
            },
            {
                answerId: 123,
                answer: "c. Moon phase and sky color",
                isCorrect: false
            },
            {
                answerId: 124,
                answer: "d. Cable type and length",
                isCorrect: false
            }
        ]
    },
    {
        questionId: 32,
        questionNo: 32,
        question: "What are the main benefits of using solar panels?",
        answers: [
            {
                answerId: 125,
                answer: "a. Savings on energy costs",
                isCorrect: false
            },
            {
                answerId: 126,
                answer: "b. Reducing emissions of harmful substances into the atmosphere",
                isCorrect: false
            },
            {
                answerId: 127,
                answer: "c. Increased security of electricity supply",
                isCorrect: false
            },
            {
                answerId: 128,
                answer: "d. All of the above",
                isCorrect: true
            }
        ]
    },
    {
        questionId: 33,
        questionNo: 33,
        question: "What is the typical lifespan of solar panels?",
        answers: [
            {
                answerId: 129,
                answer: "a. 5-10 years",
                isCorrect: false
            },
            {
                answerId: 130,
                answer: "b. 15-20 years",
                isCorrect: false
            },
            {
                answerId: 131,
                answer: "c. 25-30 years",
                isCorrect: true
            },
            {
                answerId: 132,
                answer: "d. More than 30 years",
                isCorrect: false
            }
        ]
    },
    {
        questionId: 34,
        questionNo: 34,
        question: "What safety precautions are important to follow when installing solar panels?",
        answers: [
            {
                answerId: 133,
                answer: "a. Do not leave solar panels in the rain",
                isCorrect: false
            },
            {
                answerId: 134,
                answer: "b. Fix the solar panels correctly so that they do not fall",
                isCorrect: false
            },
            {
                answerId: 135,
                answer: "c. Avoid short circuits when connecting to the power supply",
                isCorrect: false
            },
            {
                answerId: 136,
                answer: "d. All of the above",
                isCorrect: true
            }
        ]
    },
    {
        questionId: 35,
        questionNo: 35,
        question: "What factors influence the choice of location for installing solar panels?",
        answers: [
            {
                answerId: 137,
                answer: "a. Direction and angle of inclination towards the sun",
                isCorrect: true
            },
            {
                answerId: 138,
                answer: "b. Roof color and visibility from the side",
                isCorrect: false
            },
            {
                answerId: 139,
                answer: "c. Location of electrical networks",
                isCorrect: false
            },
            {
                answerId: 140,
                answer: "d. All of the above",
                isCorrect: false
            }
        ]
    },
    {
        questionId: 36,
        questionNo: 36,
        question: "What other uses for solar panels are there besides home use?",
        answers: [
            {
                answerId: 141,
                answer: "a. In city lighting and charging stations for electric vehicles",
                isCorrect: false
            },
            {
                answerId: 142,
                answer: "b. In spacecraft and communications satellites",
                isCorrect: false
            },
            {
                answerId: 143,
                answer: "c. In water supply and autonomous systems",
                isCorrect: false
            },
            {
                answerId: 144,
                answer: "d. All of the above",
                isCorrect: true
            }
        ]
    }*/
];

export default allQuestions;