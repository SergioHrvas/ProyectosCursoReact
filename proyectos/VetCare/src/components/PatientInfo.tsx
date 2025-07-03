type PatientInfoProps = {
    label: string,
    value: string
}

export const PatientInfo = ({label, value}: PatientInfoProps) => {
  return (
    <p className="font-bold mb-3 text-gray-700 uppercase"> {label}: {''}
        <span className="font-normal normal-case">{value}</span>
    </p>
  )
}
