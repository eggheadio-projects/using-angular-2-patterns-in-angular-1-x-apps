class SaveBookmarkController {
  $onChanges() {
    this.editedBookmark = Object.assign({}, this.bookmark);
  }
}

export default SaveBookmarkController;
