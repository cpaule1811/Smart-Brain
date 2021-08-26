import React, { useState, useEffect, useCallback } from 'react'

const Rank = ({name, entries}) => {
  const [emoji, setEmoji] = useState('')

  const generateEmoji = useCallback(async (entries) => { 
     const data = await fetch(`https://mm3e61swpl.execute-api.us-east-1.amazonaws.com/prod/rank?rank=${entries}`)
     const resp = await data.json()
     setEmoji(resp.input)
  }, [])
  useEffect(() => { 
    generateEmoji(entries)
  }, [generateEmoji, entries])

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