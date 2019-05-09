export default {
  name: "GuessNumber",
  filters: {
    pluralize: function(value, word, options) {
      options = options || {};
      let output = "";
      const includeNumber =
        options.includeNumber != null ? options.includeNumber : false;
      if (includeNumber === true) output += value + " ";
      if ((!value && value !== 0) || !word) return output;
      if (Array.isArray(word)) {
        output += word[value - 1] || word[word.length - 1];
      } else {
        output += word + (value === 1 ? "" : "s");
      }

      return output;
    }
  },
  data() {
    return {
      answers: [],
      attempts: 5,
      number: 0,
      guess: 0,
      gameover: false
    };
  },
  mounted() {
    this.setNumber();
  },
  methods: {
    setNumber() {
      this.number = Math.round(Math.random() * 100) + 1;
    },
    handleSubmit() {
      const diff = Math.abs(this.number - this.guess);
      const low = this.number - this.guess < 0;
      const attempt = `Próba ${this.answers.length + 1}: ${this.guess}`;
      let result;

      if (diff >= 1 && diff <= 10) {
        result = `Gorąco! Spróbuj trochę ${low ? "niżej" : "wyżej"}.`;
      } else if (diff >= 11 && diff <= 50) {
        result = `Ciepło! Spróbuj dużo ${low ? "niżej" : "wyżej"}.`;
      } else if (diff >= 51) {
        result = `Zimno! Spróbuj o wiele ${low ? "niżej" : "wyżej"}.`;
      } else {
        result = `Brawo! Wylosowana liczba to ${this.number}.`;
        this.gameover = true;
      }

      this.attempts--;
      this.answers.push({
        content: `${attempt} ${result}`,
        diff: Math.abs(diff)
      });

      if (this.attempts <= 0) {
        this.handleShowNumber();
      }
    },
    handleRestart() {
      Object.assign(this.$data, this.$options.data());
      this.setNumber();
    },
    handleShowNumber() {
      this.answers.push({
        content: `Wylosowana liczba to ${this.number}.`,
        diff: 0
      });
      this.gameover = true;
    }
  }
};
