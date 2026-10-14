const utils = require('./Utils').utils;

const test_suite = async () => {

    console.log("--- Running Unit Tests ---");
    // Unit test case 1:
    if (utils.add(2, 2) === 4) {
        console.log("Unit test case 1 passed: add(2, 2) === 4");
    } else {
        console.error("Unit test case 1 failed: if(utils.add(2, 2) === 4)");
        process.exit(1);
    }

    // Unit test case 2:
    if (utils.add(3, 3) === 6) {
        console.log("Unit test case 2 passed: add(3, 3) === 6");
    } else {
        console.error("Unit test case 2 failed: if(utils.add(3, 3) === 6)");
        process.exit(1);
    }

    console.log("\n--- Running Integration Tests (Function ซ้อน Function) ---");
    // Integration test case 1: ทดสอบการทำงานร่วมกันของ add ซ้อน add ผ่าน addThree
    if (utils.addThree(1, 2, 3) === 6) {
        console.log("Integration test 1 passed: addThree(1, 2, 3) === 6");
    } else {
        console.error("Integration test 1 failed: addThree(1, 2, 3) !== 6");
        process.exit(1);
    }

    // Integration test case 2: ทดสอบการทำงานร่วมกันอีกเคส
    if (utils.addThree(10, 20, 30) === 60) {
        console.log("Integration test 2 passed: addThree(10, 20, 30) === 60");
    } else {
        console.error("Integration test 2 failed: addThree(10, 20, 30) !== 60");
        process.exit(1);
    }

};

test_suite();
