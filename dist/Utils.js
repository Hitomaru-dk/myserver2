"use strict";
//dev
Object.defineProperty(exports, "__esModule", { value: true });
exports.utils = void 0;
function hello() {
    console.log("Hello, world!");
}
function add(a, b) {
    return a + b;
}
// 1. ฟังก์ชันผู้ส่ง (Sender): เตรียมและส่งพัสดุ
function sendPackage(sender, receiver, item) {
    return {
        sender,
        receiver,
        item,
        status: "shipped"
    };
}
// 2. ฟังก์ชันผู้รับ (Receiver): รับพัสดุและตรวจสอบการจัดส่ง
function receivePackage(pkg) {
    if (pkg && pkg.status === "shipped") {
        return Object.assign(Object.assign({}, pkg), { status: "delivered", receivedBy: pkg.receiver });
    }
    return Object.assign(Object.assign({}, pkg), { status: "failed" });
}
// 3. ฟังก์ชันการทำงานร่วมกัน (Function ซ้อน Function / Delivery Pipeline)
function deliveryProcess(sender, receiver, item) {
    const pkg = sendPackage(sender, receiver, item); // ผู้ส่งเริ่มส่ง
    return receivePackage(pkg); // ส่งต่อไปให้ผู้รับ
}
exports.utils = {
    hello,
    add,
    sendPackage,
    receivePackage,
    deliveryProcess
};
