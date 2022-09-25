

const InfoMovie = ({titleInfo, info, icon, descriptionClass = ''}) => {
  return (
    <div className={"info " + descriptionClass}>
      <h3>
        {icon}{titleInfo}:
      </h3>
      {titleInfo === 'Duração' ? 
        (<p>{info} minutos</p>) : 
        (<p>{info }</p>)
      }
    </div>
  )
}

export default InfoMovie