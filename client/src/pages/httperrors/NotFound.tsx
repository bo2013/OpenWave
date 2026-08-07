import HttpErrorLayout from "./HttpErrorLayout"

export function NotFound() {
    return (
        <HttpErrorLayout>
            <h1>Không tìm thấy trang</h1>
            <p>Nếu bạn cho rằng đây là lỗi, vui lòng liên hệ quản trị viên.</p>
        </HttpErrorLayout>
    )
}