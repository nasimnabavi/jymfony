const FormatterHelper = Jymfony.Component.Console.Helper.FormatterHelper;
const AbstractRenderer = Jymfony.Component.Console.Question.Renderer.AbstractRenderer;

/**
 * Renders a Question prompt using readline.
 *
 * This class is internal and should be considered private
 * DO NOT USE this directly.
 *
 * @internal
 * @memberOf Jymfony.Component.Console.Question.Renderer
 */
class RawListRenderer extends AbstractRenderer {
    /**
     * @inheritDoc
     */
    doAsk() {
        this._print();

        let cb;
        const formatter = new FormatterHelper();
        return new Promise(resolve => {
            this._input.on('data', cb = (data) => {
                let value = __jymfony.rtrim(data.toString(), '\r\n');

                if (! this._question.multiple) {
                    if (! (value in this._question._choices)) {
                        this._output.writeln(formatter.formatBlock('"' + value + '" is not a valid choice.', 'error', true));
                        this._print();
                        return;
                    }

                    value = this._question._choices[value].value;
                } else {
                    if (!! value && ! /^[^,]+(?:,[^,]+)*$/.test(value)) {
                        this._output.writeln(formatter.formatBlock('Value "' + value + '" is invalid.', 'error', true));
                        this._print();
                        return;
                    }

                    let selected = value.split(',').map(T => __jymfony.trim(T)).filter(T => !! T);
                    let choices = [];
                    for (let c of selected) {
                        if (! (c in this._question._choices)) {
                            this._output.writeln(formatter.formatBlock('"' + c + '" is not a valid choice.', 'error', true));
                            this._print();
                            return;
                        }

                        choices.push(this._question._choices[c].value);
                    }

                    value = choices;
                }

                this._input.removeListener('data', cb);
                this._input.pause();

                resolve(value);
            });

            this._input.resume();
        });
    }

    _print() {
        let spaces = this._question._choices.length.toString().length;
        for (let key = 0; key < this._question._choices.length; key++) {
            let choice = this._question._choices[key];
            this._output.writeln(__jymfony.sprintf(' %'+spaces+'d) ', key) + choice.label);
        }

        this._output.write('[<info>?</info>] ' + this._question._question + ' ');
    }
}

module.exports = RawListRenderer;