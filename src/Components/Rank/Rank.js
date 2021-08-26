import React, { useState, useEffect, useCallback } from 'react'

const Rank = ({name, entries}) => {
  const [emoji, setEmoji] = useState('')

  const handleRank = useCallback(async(entries) => {
    const resp = await fetch(`https://mm3e61swpl.execute-api.us-east-1.amazonaws.com/prod/rank?rank=${entries}`)
      const data = await resp.json()
      console.log(data)
      setEmoji(data.input)
  }, [setEmoji])

  useEffect(() => { 
    handleRank(entries)
  }, [entries, handleRank])


  return (
     <div>
       <div className='white f3'> 
         {`${name}, your current entry count is...`}
       </div>
       <div className='white f1'> 
         {`#${entries}`}
       </div>
       <div className='white f3'> 
         {`Rank Badge: ${emoji}`}
       </div>
     </div>
  );
}

export default Rank;     