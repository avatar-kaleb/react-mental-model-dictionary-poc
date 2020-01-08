import React, { Component } from 'react';
// re-evaluate this later, cant bundle with webpack w/o ejecting cra
import RichTextEditor from 'react-rte';
import { Card, CardActions, CardText, CardTitle, Button, TabsContainer, Tabs, Tab, TextField } from 'react-md';
import { TAB_LABELS, EDITOR_TYPES } from '../../constants/enums';
import { db } from '../../firebase';

/**
 * Class component to manage editing a mental model's content
 */
class MentalModelEditor extends Component {
  constructor(props) {
    super(props);

    this.state = {
      mentalModel: {
        id: '',
        img: '',
        category: '',
        definition: RichTextEditor.createEmptyValue(),
        example: RichTextEditor.createEmptyValue(),
        defense: RichTextEditor.createEmptyValue(),
        moreResources: RichTextEditor.createEmptyValue(),
        summary: '',
        title: ''
      }
    };

    this.HTML_TYPE = 'html';
  }

  /**
   * On component mounting, let's set our empty values for mental model state,
   * define our firebase callback, and read data from firebase
   */
  componentDidMount() {
    // retrieve the mental model passed in from the route
    this.firebaseCallback = snap => {
      const mentalModel = snap.val();
      this.setState({
        mentalModel: {
          ...mentalModel,
          definition: RichTextEditor.createValueFromString(mentalModel.definition, this.HTML_TYPE),
          example: RichTextEditor.createValueFromString(mentalModel.example, this.HTML_TYPE),
          defense: RichTextEditor.createValueFromString(mentalModel.defense, this.HTML_TYPE),
          moreResources: RichTextEditor.createValueFromString(mentalModel.moreResources, this.HTML_TYPE)
        }
      });
    };
    db.onGetMentalModel(this.props.mentalModelId, this.firebaseCallback);
  }

  /**
   * When we unmount, remove the mental model listener for firebase
   */
  componentWillUnmount() {
    // Un-register the listener on '/mental-models/:mentalModelId'.
    db.offGetMentalModel(this.firebaseCallback);
  }

  /**
   * Set mental model state for category to new value on changes
   * @param {String} value
   */
  _setCategoryStateOnChange(value) {
    const mentalModel = { ...this.state.mentalModel };
    mentalModel.category = value;
    this.setState({ mentalModel });
  }

  /**
   * Set mental model state for id to new value on changes
   * @param {String} value
   */
  _setIdStateOnChange(value) {
    const mentalModel = { ...this.state.mentalModel };
    mentalModel.id = value;
    this.setState({ mentalModel });
  }

  /**
   * Set mental model state for img to new value on changes
   * @param {String} value
   */
  _setImgStateOnChange(value) {
    const mentalModel = { ...this.state.mentalModel };
    mentalModel.img = value;
    this.setState({ mentalModel });
  }

  /**
   * Set mental model state for summary to new value on changes
   * @param {String} value
   */
  _setSummaryStateOnChange(value) {
    const mentalModel = { ...this.state.mentalModel };
    mentalModel.summary = value;
    this.setState({ mentalModel });
  }

  /**
   * Set mental model state for title to new value on changes
   * @param {String} value
   */
  _setTitleStateOnChange(value) {
    const mentalModel = { ...this.state.mentalModel };
    mentalModel.title = value;
    this.setState({ mentalModel });
  }

  /**
   * When one of the text editors change, we want to update the state
   * This looks a bit funky, but if we don't update new state based on prev,
   * then it was erasing the values in the text editor
   * @param {String} type - the type of editor value sent
   * @param {Object} value - value object sent from the rich text editor
   */
  _updateMentalModelState(type, value) {
    let updatedMentalModel = {
      ...this.state.mentalModel,
      definition: type === EDITOR_TYPES.DEFINITION ? value : this.state.mentalModel.definition,
      example: type === EDITOR_TYPES.EXAMPLE ? value : this.state.mentalModel.example,
      defense: type === EDITOR_TYPES.DEFENSE ? value : this.state.mentalModel.defense,
      moreResources: type === EDITOR_TYPES.RESOURCES ? value : this.state.mentalModel.moreResources
    };
    this.setState({ mentalModel: updatedMentalModel });
  }

  /**
   * When the save / submit button is clicked, save the mental model state into
   * firebase
   */
  _updateMentalModelOnSave() {
    const { id, definition, example, defense, moreResources } = this.state.mentalModel;
    db.doUpdateMentalModel(id, {
      ...this.state.mentalModel, // gather rest of props then overrwrite some with html
      definition: definition.toString(this.HTML_TYPE),
      example: example.toString(this.HTML_TYPE),
      defense: defense.toString(this.HTML_TYPE),
      moreResources: moreResources.toString(this.HTML_TYPE)
    });
  }

  render() {
    return (
      <Card className="md-grid">
        <CardTitle title="Mental Model Editor" />
        <CardText>
          <TextField
            id="mm-id-textfield"
            label="ID"
            value={this.state.mentalModel.id}
            onChange={(value, event) => this._setIdStateOnChange(value)}
            type="text"
            placeholder="authority..."
          />
          <TextField
            id="mm-img-textfield"
            label="Image"
            value={this.state.mentalModel.img}
            onChange={(value, event) => this._setImgStateOnChange(value)}
            type="text"
            placeholder="authority..."
          />
          <TextField
            id="mm-title-textfield"
            label="Title"
            value={this.state.mentalModel.title}
            onChange={(value, event) => this._setTitleStateOnChange(value)}
            type="text"
            placeholder="Authority Bi..."
          />
          <TextField
            id="mm-category-textfield"
            label="Category"
            value={this.state.mentalModel.category}
            onChange={(value, event) => this._setCategoryStateOnChange(value)}
            type="text"
            placeholder="Philosophy..."
          />
          <TextField
            id="mm-summary-textfield"
            label="Summary"
            value={this.state.mentalModel.summary}
            onChange={(value, event) => this._setSummaryStateOnChange(value)}
            type="text"
            placeholder="This mental model..."
          />
          <br />
          <TabsContainer colored panelClassName="md-grid">
            <Tabs tabId="mm-tabs">
              <Tab label={TAB_LABELS.DEFINITION}>
                <RichTextEditor
                  onChange={this._updateMentalModelState.bind(this, EDITOR_TYPES.DEFINITION)}
                  value={this.state.mentalModel.definition}
                />
              </Tab>
              <Tab label={TAB_LABELS.EXAMPLE}>
                <RichTextEditor
                  onChange={this._updateMentalModelState.bind(this, EDITOR_TYPES.EXAMPLE)}
                  value={this.state.mentalModel.example}
                  EXAMPLE
                />
              </Tab>
              <Tab label={TAB_LABELS.DEFENSE}>
                <RichTextEditor
                  onChange={this._updateMentalModelState.bind(this, EDITOR_TYPES.DEFENSE)}
                  value={this.state.mentalModel.defense}
                />
              </Tab>
              <Tab label={TAB_LABELS.RESOURCES}>
                <RichTextEditor
                  onChange={this._updateMentalModelState.bind(this, EDITOR_TYPES.RESOURCES)}
                  value={this.state.mentalModel.moreResources}
                />
              </Tab>
            </Tabs>
          </TabsContainer>
        </CardText>
        <CardActions className="md-divider-border md-divider-border--top ">
          <Button flat secondary onClick={this._updateMentalModelOnSave.bind(this)}>
            Submit
          </Button>
        </CardActions>
      </Card>
    );
  }
}

export default MentalModelEditor;
