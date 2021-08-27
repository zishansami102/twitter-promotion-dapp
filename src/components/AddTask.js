import { useState } from 'react'
import TagsInput from './TagsInput'

const AddTask = ({ onAdd }) => {
  const [text, setText] = useState('')

  const [totalReward, setTotalReward] = useState('')
  const [milestone, setMilestone] = useState('')
  const [promotionCategory, setPromotionCategory] = useState('')
  const [reminder, setReminder] = useState(false)

  const onSubmit = (e) => {
    e.preventDefault()

    if (!text) {
      alert('Please add a task')
      return
    }

    onAdd({ text, totalReward, milestone, promotionCategory, reminder})

    setText('')
    // setDay('')
    setReminder(false)
    setTotalReward('')
    setMilestone('')
    setPromotionCategory('')
  }
  const selectedTags = tags => {
		console.log(tags);
	};

  return (
    <form className='add-form' onSubmit={onSubmit} onkeydown="return event.key != 'Enter';">
      <div className='form-control'>
        <label>Job title</label>
        <input
          type='text'
          placeholder='Title'
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </div>
      
      <div className="App">
				<div className='form-control'>
					<label>Tweet Must Contain</label>
					<TagsInput selectedTags={selectedTags}  tags={['Nodejs', 'MongoDB']}/>
				</div>
			</div>

      <div className='form-control'>
        <label>Total Reward Offered</label>
        <input
          type='text'
          placeholder='Amount in Eth'
          value={totalReward}
          onChange={(e) => setTotalReward(e.target.value)}
        />
      </div>
      <div className='form-control'>
        <label>Set Milestone</label>
        <input
          type='text'
          placeholder='Amount in Eth'
          value={milestone}
          onChange={(e) => setMilestone(e.target.value)}
        />
      </div>
      <div className='form-control'>
        <label>Set Promotion Category</label>
        <input
          type='text'
          placeholder='text'
          value={promotionCategory}
          data-role="tagsinput" 
          onChange={(e) => setPromotionCategory(e.target.value)}
        />
      </div>
      <div className='form-control form-control-check'>
        <label>Set Reminder</label>
        <input
          type='checkbox'
          checked={reminder}
          value={reminder}
          onChange={(e) => setReminder(e.currentTarget.checked)}
        />
      </div>

      <input type='submit' value='Save Task' className='btn btn-block' />
    </form>
  )
}

export default AddTask







// const TagsInput = props => {
// 	const [tags, setTags] = React.useState(props.tags);
// 	const removeTags = indexToRemove => {
// 		setTags([...tags.filter((_, index) => index !== indexToRemove)]);
// 	};
// 	const addTags = event => {
// 		if (event.target.value !== "") {
// 			setTags([...tags, event.target.value]);
// 			props.selectedTags([...tags, event.target.value]);
// 			event.target.value = "";
// 		}
// 	};
// 	return (
// 		<div className="tags-input">
// 			<ul id="tags">
// 				{tags.map((tag, index) => (
// 					<li key={index} className="tag">
// 						<span className='tag-title'>{tag}</span>
// 						<span className='tag-close-icon'
// 							onClick={() => removeTags(index)}
// 						>
// 							x
// 						</span>
// 					</li>
// 				))}
// 			</ul>
// 			<input
// 				type="text"
// 				onKeyUp={event => event.key === "Enter" ? addTags(event) : null}
// 				placeholder="Press enter to add tags"
// 			/>
// 		</div>
// 	);
// };
