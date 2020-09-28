import React from 'react'
import { matchAny } from './concerns/matchers'

function markIt (name, query) {
  const regexp = matchAny(query)
  return name.replace(regexp, '<mark>$&</mark>')
}

const DefaultSuggestionsComponent = ({ id, classNames, children }) => (
  <div className={classNames.suggestions}>
    <ul role='listbox' id={id}>{children}</ul>
  </div>
)

const DefaultSuggestionComponent = ({ item, query }) => (
  <span dangerouslySetInnerHTML={{ __html: markIt(item.name, query) }} />
)

class Suggestions extends React.Component {
  onMouseDown (item, e) {
    // focus is shifted on mouse down but calling preventDefault prevents this
    e.preventDefault()
    this.props.addTag(item)
  }

  render () {
    if (!this.props.expanded || !this.props.options.length) {
      return null
    }

    const SuggestionComponent = this.props.suggestionComponent || DefaultSuggestionComponent
    const SuggestionsComponent = this.props.suggestionsComponent || DefaultSuggestionsComponent

    const options = this.props.options.map((item, index) => {
      const key = `${this.props.id}-${index}`
      const classNames = [this.props.classNames.suggestion]

      if (this.props.index === index) {
        classNames.push(this.props.classNames.suggestionActive)
      }

      if (item.disabled) {
        classNames.push(this.props.classNames.suggestionDisabled)
      }

      return (
        <li
          id={key}
          key={key}
          role='option'
          className={classNames.join(' ')}
          aria-disabled={item.disabled === true}
          onMouseDown={this.onMouseDown.bind(this, item)}
        >
          {item.disableMarkIt ? item.name
            : <SuggestionComponent item={item} query={this.props.query} />}
        </li>
      )
    })

    return (
      <SuggestionsComponent id={this.props.id} classNames={this.props.classNames}>
        {options}
      </SuggestionsComponent>
    )
  }
}

export default Suggestions
