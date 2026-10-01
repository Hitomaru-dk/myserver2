"use strict";
//dev
Object.defineProperty(exports, "__esModule", { value: true });
exports.utils = void 0;
function hello() {
    console.log("Hello, world!");
}
// 1. ฟังก์ชันบวกเลขพื้นฐาน (Unit function)
function add(a, b) {
    return a + b;
}
// 2. ฟังก์ชันซ้อนฟังก์ชัน (Integration: นำ add มาทำงานร่วมกันต่อเนื่อง)
function addThree(a, b, c) {
    const step1 = add(a, b); // ขั้นแรก: ผู้ส่ง (คำนวณคู่แรก)
    return add(step1, c); // ขั้นสอง: ผู้รับ (นำผลลัพธ์มาคำนวณต่อ)
}
exports.utils = {
    hello,
    add,
    addThree
};
