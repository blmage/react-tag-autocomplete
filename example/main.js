import React from 'react'
import ReactDOM from 'react-dom'
import ReactTags from '../lib/ReactTags'
import suggestions from './countries'

const Tag = (props) => {
  const { classNames, removeButtonText, onUpdate, onDelete, tag } = props

  const onToggle = (e) => {
    e.stopPropagation()
    onUpdate({ ...tag, checked: !tag.checked })
  }

  return (
    <button type='button' className={classNames.selectedTag} title={removeButtonText} onClick={onDelete}>
      <input type='checkbox' checked={tag.checked} onClick={onToggle} />
      <span className={classNames.selectedTagName}>{tag.name}</span>
    </button>
  )
}

class App extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      tags: [
        { id: 184, name: 'Thailand', checked: false },
        { id: 86, name: 'India', checked: true }
      ],
      suggestions: suggestions.map((country) => ({ ...country, checked: false }))
    }

    this.reactTags = React.createRef()
  }

  onUpdate (i, tag) {
    const tags = this.state.tags.slice(0)
    tags[i] = tag
    this.setState({ tags })
  }

  onDelete (i) {
    const tags = this.state.tags.slice(0)
    tags.splice(i, 1)
    this.setState({ tags })
  }

  onAddition (tag) {
    const tags = [].concat(this.state.tags, tag)
    this.setState({ tags })
  }

  render () {
    return (
      <>
        <p>Select the countries you have visited using React Tags below:</p>
        <ReactTags
          ref={this.reactTags}
          tags={this.state.tags}
          suggestions={this.state.suggestions}
          tagComponent={Tag}
          onDelete={this.onDelete.bind(this)}
          onAddition={this.onAddition.bind(this)}
          onUpdate={this.onUpdate.bind(this)}
        />
        <p>Output:</p>
        <pre><code>{JSON.stringify(this.state.tags, null, 2)}</code></pre>
      </>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'))
