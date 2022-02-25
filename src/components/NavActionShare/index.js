import { h } from "preact"

import { Ident, NavAction } from ".."


const handleShare = (props) => {
  if (window.location.pathname.toLowerCase().startsWith(Ident.href)) { return }
  if (props.toggleModal) {
    props.toggleModal({visible:false})
  }
  navigator.share({
    title: "OsteoScout",
    text: "",
    url: window.location.href
  },{
    copy: true,
    email: true,
    print: true,
    sms: true,
    messenger: true,
    facebook: true,
    whatsapp: true,
    twitter: true,
    linkedin: true,
    telegram: false,
    skype: false,
    pinterest: false,
    language: 'en'
  })
  // .then( _ => console.log('Yay, you shared it :)'))
  // .catch( error => console.log('Oh noh! You couldn\'t share it! :\'(\n', error));
}

const NavActionShare = (props) => {
  return (
    <NavAction
      href={null}
      onClick={ () => { handleShare(props) } }>
      <NavAction.Icon ariaLabel="Share">🔗</NavAction.Icon>
      <NavAction.Text>&nbsp;Share</NavAction.Text>
    </NavAction>
  )
}

export default NavActionShare
export { NavActionShare }
