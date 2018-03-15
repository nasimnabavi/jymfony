const VariableNodeDefinition = Jymfony.Component.Config.Definition.Builder.VariableNodeDefinition;
const ScalarNode = Jymfony.Component.Config.Definition.ScalarNode;

/**
 * This class provides a fluent interface for defining a node.
 *
 * @memberOf Jymfony.Component.Config.Definition.Builder
 */
class ScalarNodeDefinition extends VariableNodeDefinition {
    /**
     * Instantiate a Node.
     *
     * @returns {Jymfony.Component.Config.Definition.ScalarNode} The node
     */
    instantiateNode() {
        return new ScalarNode(this._name, this._parent);
    }
}

module.exports = ScalarNodeDefinition;
