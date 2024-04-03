export class DateService {

    convertDateFormat(inputDate: string): string {
        // Tách thông tin ngày, tháng và năm từ chuỗi đầu vào
        const partsDate = inputDate.split('T')[0].split('-');
        const partsTime = inputDate.split('T')[1].split(':');
        const year = partsDate[0];
        const month = partsDate[1];
        const day = partsDate[2];

        const second = partsTime[0];
        const minute = partsTime[1];
        const hours = partsTime[2];
        // Định dạng lại theo đúng định dạng "dd/MM/yyyy"
        const formattedDate = ` ${second}:${minute}:${hours} ${day}/${month}/${year}`;

        return formattedDate;
    }

    addDaysAndConvert = (inputDate: string, daysToAdd: number): string => {
        try {
            // Chuyển đổi chuỗi ngày tháng thành đối tượng Date
            const date = new Date(inputDate);
            // Cộng thêm số ngày vào ngày tháng
            date.setDate(date.getDate() + daysToAdd);
            const partsTime = inputDate.split('T')[1].split(':');

            // Lấy thông tin ngày, tháng và năm sau khi cộng thêm ngày
            const second = partsTime[0];
            const minute = partsTime[1];
            const hours = partsTime[2];

            const day = date.getDate().toString().padStart(2, '0');
            const month = (date.getMonth() + 1).toString().padStart(2, '0');
            const year = date.getFullYear();

            // Định dạng lại theo đúng định dạng "dd/MM/yyyy"
            const formattedDate = ` ${second}:${minute}:${hours} ${day}/${month}/${year}`;

            return formattedDate;
        } catch (error) {
            // Xử lý lỗi nếu có
            console.error('Lỗi chuyển đổi định dạng:', error);
            return 'Ngày không hợp lệ';
        }
    }
} 