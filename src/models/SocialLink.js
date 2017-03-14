class SocialLink {
  constructor({ name = '', href = '' } = {}) {
    this.name = name;
    this.href = href;
  }
  get name() { return this._name; }
  set name(name) {
    this._name = name.toString();
  }
  get href() { return this._href; }
  set href(href) {
    this._href = encodeURI(href);
  }
}

export default SocialLink;
