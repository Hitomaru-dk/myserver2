//dev

function hello() {
    console.log("Hello, world!");
}

// 1. ฟังก์ชันบวกเลขพื้นฐาน (Unit function)
function add(a: number, b: number): number {
    return a + b;
}

// 2. ฟังก์ชันซ้อนฟังก์ชัน (Integration: นำ add มาทำงานร่วมกันต่อเนื่อง)
function addThree(a: number, b: number, c: number): number {
    const step1 = add(a, b); // ขั้นแรก: ผู้ส่ง (คำนวณคู่แรก)
    return add(step1, c);    // ขั้นสอง: ผู้รับ (นำผลลัพธ์มาคำนวณต่อ)
}

export const utils = {
    hello,
    add,
    addThree
};
