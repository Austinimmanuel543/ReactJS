import './buttonPlantr.css'

export const ButtonPlantr = ({ children, color }) => {
    return (
        <button className={(color === 'light') ? 'buttonPlantrLight' : 'buttonPlantr'}>{children}</button>
    )
}