import React from "react";
import TextEditor from "../../components/TextEditor";
import { navigate } from "@reach/router";

import { UserContext, APP_NAME } from "../../util";
import SaveTransactionWithConfirmationButton from "../../components/SaveTransactionWithConfirmationButton";

const tags = {
  "App-Name": APP_NAME
};

class NewPost extends React.Component {
  constructor(props) {
    super(props);
    this.state = { post: "" };
    this.handleTextChange = this.handleTextChange.bind(this);
    this.onSave = this.onSave.bind(this);
  }

  static contextType = UserContext;

  handleTextChange = value => {
    this.setState({ post: value() });
  };

  async onSave(tx) {
    navigate(`/post/${tx.id}`);
  }

  render() {
    const { post } = this.state;
    const { user } = this.context;
    return (
      <div>
        <TextEditor handleTextChange={this.handleTextChange} />
        <SaveTransactionWithConfirmationButton
          data={post}
          tags={tags}
          user={user}
          onSave={this.onSave}
          buttonText="Publish"
          color="primary"
        />
      </div>
    );
  }
}

export default NewPost;
