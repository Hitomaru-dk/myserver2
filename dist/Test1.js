"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const utils = require('./Utils').utils;
const test_suite = () => __awaiter(void 0, void 0, void 0, function* () {
    console.log("--- Running Unit Tests ---");
    // Unit test case 1:
    if (utils.add(2, 2) === 4) {
        console.log("Unit test case 1 passed");
    }
    else {
        console.error("Unit test case 1 failed: if(utils.add(2, 2) === 4)");
        process.exit(1);
    }
    // Unit test case 2:
    if (utils.add(3, 3) === 6) {
        console.log("Unit test case 2 passed");
    }
    else {
        console.error("Unit test case 2 failed: if(utils.add(3, 3) === 6)");
        process.exit(1);
    }
    console.log("\n--- Running Integration Tests (Sender & Receiver) ---");
    // Integration test case 1: ทดสอบการทำงานร่วมกันของ sendPackage -> receivePackage
    const delivered = utils.deliveryProcess("ShopA", "CustomerB", "Book");
    if (delivered.status === "delivered" && delivered.receivedBy === "CustomerB") {
        console.log("Integration test 1 passed: Sender & Receiver worked together successfully!");
    }
    else {
        console.error("Integration test 1 failed!");
        process.exit(1);
    }
    // Integration test case 2: ทดสอบกรณีผิดพลาด (คนส่งไม่ได้ส่งมา แต่คนรับพยายามรับ)
    const badPackage = { sender: "Stranger", receiver: "CustomerB", item: "Unknown", status: "pending" };
    const failedDelivery = utils.receivePackage(badPackage);
    if (failedDelivery.status === "failed") {
        console.log("Integration test 2 passed: Correctly handled invalid package status!");
    }
    else {
        console.error("Integration test 2 failed!");
        process.exit(1);
    }
});
test_suite();
