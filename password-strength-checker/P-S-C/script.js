/* =========================================
   GET HTML ELEMENTS
========================================= */

const passwordInput =
    document.getElementById("password");

const togglePassword =
    document.getElementById("togglePassword");

const strengthText =
    document.getElementById("strengthText");

const strengthBar =
    document.getElementById("strengthBar");

const scoreText =
    document.getElementById("scoreText");

const suggestionsList =
    document.getElementById("suggestionsList");


/* Requirement elements */

const lengthRequirement =
    document.getElementById("lengthRequirement");

const longRequirement =
    document.getElementById("longRequirement");

const lowercaseRequirement =
    document.getElementById("lowercaseRequirement");

const uppercaseRequirement =
    document.getElementById("uppercaseRequirement");

const numberRequirement =
    document.getElementById("numberRequirement");

const specialRequirement =
    document.getElementById("specialRequirement");

const veryLongRequirement =
    document.getElementById("veryLongRequirement");


/* =========================================
   COMMON PASSWORDS
========================================= */

const commonPasswords = [

    "password",
    "password123",
    "123456",
    "12345678",
    "123456789",
    "qwerty",
    "qwerty123",
    "admin",
    "admin123",
    "letmein",
    "welcome",
    "welcome123",
    "abc123",
    "iloveyou",
    "monkey",
    "dragon",
    "football",
    "login",
    "pass123"

];


/* =========================================
   SHOW / HIDE PASSWORD
========================================= */

togglePassword.addEventListener(
    "click",
    function () {

        if (passwordInput.type === "password") {

            passwordInput.type = "text";

            togglePassword.textContent = "🙈";

            togglePassword.setAttribute(
                "aria-label",
                "Hide password"
            );

        } else {

            passwordInput.type = "password";

            togglePassword.textContent = "👁";

            togglePassword.setAttribute(
                "aria-label",
                "Show password"
            );

        }

    }
);


/* =========================================
   CHECK PASSWORD IN REAL TIME
========================================= */

passwordInput.addEventListener(
    "input",
    function () {

        checkPassword(
            passwordInput.value
        );

    }
);


/* =========================================
   MAIN PASSWORD CHECKER
========================================= */

function checkPassword(password) {

    /* Empty password */

    if (password.length === 0) {

        resetChecker();

        return;
    }


    /* =====================================
       REGULAR EXPRESSIONS
    ===================================== */

    const hasLowercase =
        /[a-z]/.test(password);


    const hasUppercase =
        /[A-Z]/.test(password);


    const hasNumber =
        /[0-9]/.test(password);


    const hasSpecial =
        /[^A-Za-z0-9]/.test(password);


    /* =====================================
       LENGTH CHECKS
    ===================================== */

    const has8Characters =
        password.length >= 8;


    const has12Characters =
        password.length >= 12;


    const has16Characters =
        password.length >= 16;


    /* =====================================
       COMMON PASSWORD CHECK
    ===================================== */

    const lowerPassword =
        password.toLowerCase();


    const isCommonPassword =
        commonPasswords.includes(
            lowerPassword
        );


    /* =====================================
       REPEATED CHARACTER CHECK
    ===================================== */

    const hasRepeatedCharacters =
        /(.)\1\1/.test(password);


    /* =====================================
       SEQUENTIAL PATTERN CHECK
    ===================================== */

    const sequentialPatterns = [

        "1234",
        "2345",
        "3456",
        "4567",
        "5678",
        "6789",

        "abcd",
        "bcde",
        "cdef",
        "defg",

        "qwer",
        "asdf",
        "zxcv"

    ];


    const hasSequentialPattern =
        sequentialPatterns.some(
            pattern =>
                lowerPassword.includes(pattern)
        );


    /* =====================================
       UPDATE REQUIREMENTS
    ===================================== */

    updateRequirement(
        lengthRequirement,
        has8Characters
    );


    updateRequirement(
        longRequirement,
        has12Characters
    );


    updateRequirement(
        lowercaseRequirement,
        hasLowercase
    );


    updateRequirement(
        uppercaseRequirement,
        hasUppercase
    );


    updateRequirement(
        numberRequirement,
        hasNumber
    );


    updateRequirement(
        specialRequirement,
        hasSpecial
    );


    updateRequirement(
        veryLongRequirement,
        has16Characters
    );


    /* =====================================
       CALCULATE SCORE
    ===================================== */

    let score = 0;


    /*
       Basic length
    */

    if (has8Characters) {

        score++;

    }


    /*
       Longer password
    */

    if (has12Characters) {

        score++;

    }


    /*
       Character types
    */

    if (hasLowercase) {

        score++;

    }


    if (hasUppercase) {

        score++;

    }


    if (hasNumber) {

        score++;

    }


    if (hasSpecial) {

        score++;

    }


    /*
       Very long password
    */

    if (has16Characters) {

        score++;

    }


    /*
       Common password penalty
    */

    if (isCommonPassword) {

        score -= 2;

    }


    /*
       Repeated character penalty
    */

    if (hasRepeatedCharacters) {

        score--;

    }


    /*
       Sequential pattern penalty
    */

    if (hasSequentialPattern) {

        score--;

    }


    /*
       Prevent negative score
    */

    score = Math.max(
        0,
        score
    );


    /*
       Maximum score displayed
    */

    const displayScore =
        Math.min(score, 7);


    scoreText.textContent =
        `${displayScore} / 7`;


    /* =====================================
       DETERMINE STRENGTH
    ===================================== */

    let strength;
    let percentage;


    if (score <= 2) {

        strength = "Very Weak";

        percentage = 20;

    }

    else if (score <= 4) {

        strength = "Weak";

        percentage = 40;

    }

    else if (score === 5) {

        strength = "Medium";

        percentage = 60;

    }

    else if (score === 6) {

        strength = "Strong";

        percentage = 80;

    }

    else {

        strength = "Very Strong";

        percentage = 100;

    }


    /* =====================================
       UPDATE STRENGTH DISPLAY
    ===================================== */

    strengthText.textContent =
        strength;


    strengthBar.style.width =
        `${percentage}%`;


    updateStrengthColor(
        strength
    );


    /* =====================================
       GENERATE SUGGESTIONS
    ===================================== */

    generateSuggestions({

        password,

        has8Characters,

        has12Characters,

        has16Characters,

        hasLowercase,

        hasUppercase,

        hasNumber,

        hasSpecial,

        isCommonPassword,

        hasRepeatedCharacters,

        hasSequentialPattern

    });

}


/* =========================================
   UPDATE REQUIREMENT
========================================= */

function updateRequirement(
    element,
    isValid
) {

    const check =
        element.querySelector(".check");


    if (isValid) {

        element.classList.add(
            "valid"
        );

        check.textContent = "✓";

    } else {

        element.classList.remove(
            "valid"
        );

        check.textContent = "✕";

    }

}


/* =========================================
   STRENGTH COLORS
========================================= */

function updateStrengthColor(
    strength
) {

    if (strength === "Very Weak") {

        strengthBar.style.backgroundColor =
            "#dc2626";

        strengthText.style.color =
            "#dc2626";

    }

    else if (strength === "Weak") {

        strengthBar.style.backgroundColor =
            "#f97316";

        strengthText.style.color =
            "#f97316";

    }

    else if (strength === "Medium") {

        strengthBar.style.backgroundColor =
            "#eab308";

        strengthText.style.color =
            "#ca8a04";

    }

    else if (strength === "Strong") {

        strengthBar.style.backgroundColor =
            "#22c55e";

        strengthText.style.color =
            "#16a34a";

    }

    else {

        strengthBar.style.backgroundColor =
            "#15803d";

        strengthText.style.color =
            "#15803d";

    }

}


/* =========================================
   GENERATE SUGGESTIONS
========================================= */

function generateSuggestions(data) {

    const suggestions = [];


    if (!data.has8Characters) {

        suggestions.push(
            "Use at least 8 characters."
        );

    }


    if (!data.has12Characters) {

        suggestions.push(
            "Use 12 or more characters for better security."
        );

    }


    if (!data.has16Characters) {

        suggestions.push(
            "Consider using 16 or more characters."
        );

    }


    if (!data.hasLowercase) {

        suggestions.push(
            "Add lowercase letters (a-z)."
        );

    }


    if (!data.hasUppercase) {

        suggestions.push(
            "Add uppercase letters (A-Z)."
        );

    }


    if (!data.hasNumber) {

        suggestions.push(
            "Add at least one number."
        );

    }


    if (!data.hasSpecial) {

        suggestions.push(
            "Add a special character such as !, @, # or $."
        );

    }


    if (data.isCommonPassword) {

        suggestions.push(
            "Avoid common passwords that attackers can easily guess."
        );

    }


    if (data.hasRepeatedCharacters) {

        suggestions.push(
            "Avoid excessive repeated characters such as aaa or 111."
        );

    }


    if (data.hasSequentialPattern) {

        suggestions.push(
            "Avoid predictable sequences such as 1234, abcd or qwer."
        );

    }


    /*
       If no problems were found
    */

    if (suggestions.length === 0) {

        suggestions.push(
            "Great! Your password meets the basic strength checks."
        );

        suggestions.push(
            "For important accounts, use a unique password and consider a password manager."
        );

    }


    /*
       Display suggestions
    */

    suggestionsList.innerHTML = "";


    suggestions.forEach(
        function (suggestion) {

            const li =
                document.createElement("li");

            li.textContent =
                suggestion;

            suggestionsList.appendChild(
                li
            );

        }
    );

}


/* =========================================
   RESET CHECKER
========================================= */

function resetChecker() {

    strengthText.textContent =
        "Very Weak";


    strengthText.style.color =
        "#64748b";


    strengthBar.style.width =
        "0%";


    strengthBar.style.backgroundColor =
        "#e2e8f0";


    scoreText.textContent =
        "0 / 7";


    /*
       Reset all requirements
    */

    const requirements = [

        lengthRequirement,
        longRequirement,
        lowercaseRequirement,
        uppercaseRequirement,
        numberRequirement,
        specialRequirement,
        veryLongRequirement

    ];


    requirements.forEach(
        function (requirement) {

            requirement.classList.remove(
                "valid"
            );

            requirement.querySelector(
                ".check"
            ).textContent = "✕";

        }
    );


    /*
       Reset suggestions
    */

    suggestionsList.innerHTML = `

        <li>
            Enter a password to receive security suggestions.
        </li>

    `;

}
