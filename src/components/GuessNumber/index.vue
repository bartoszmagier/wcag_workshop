<template>
  <div class="guess box">
    <h1 class="title has-text-centered" tabindex="0">Jaka to liczba?</h1>
    <p class="content" tabindex="0">
      Odgadnij liczbę z przedziału od 1 do 100. Masz jeszcze {{ attempts }}
      {{ attempts | pluralize(["próbę", "próby", "próby", "próby", "prób"]) }}.
    </p>
    <form @submit.prevent="handleSubmit">
      <div class="field">
        <div class="field is-grouped">
          <div class="control is-expanded">
            <input
              aria-label="Twoja Liczba"
              class="input"
              type="number"
              max="100"
              min="1"
              placeholder="Wpisz liczbę pomiędzy 1 i 100"
              v-model.number="guess"
              :disabled="gameover"
            />
          </div>
          <div class="control">
            <button
              class="button is-primary"
              :disabled="!guess || guess > 100 || gameover"
              type="submit"
            >
              Zgaduję
            </button>
          </div>
          <div class="field has-addons">
            <div class="control">
              <button
                aria-label="Zrestartuj grę"
                class="button"
                @click="handleRestart"
                type="button"
              >
                <span class="icon"><i class="fas fa-sync"></i></span>
              </button>
            </div>
            <div class="control">
              <button
                aria-label="Pokaż wylosowaną liczbę"
                class="button"
                @click="handleShowNumber"
                type="button"
              >
                <span class="icon"><i class="fas fa-eye"></i></span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
    <div class="attempts" aria-live="assertive">
      <div
        class="notification"
        v-for="(answer, index) in answers"
        :key="index"
        :class="{
          'is-success': answer.diff === 0,
          'is-primary': answer.diff >= 1 && answer.diff <= 10,
          'is-info': answer.diff >= 11 && answer.diff <= 50,
          'is-link': answer.diff >= 51
        }"
        tabindex="0"
      >
        {{ answer.content }}
      </div>
    </div>
  </div>
</template>

<script src="./GuessNumber.js" />
<style src="./GuessNumber.scss" lang="scss" />
