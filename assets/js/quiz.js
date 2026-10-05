/* ==========================================================================
   Mini quiz. Put this where the quiz should appear:

   <script type="application/json" class="quiz-data">
   { "questions": [
       { "q": "Which file holds web routes?",
         "options": ["`routes/api.php`", "`routes/web.php`", "`app/routes.php`"],
         "answer": 1,
         "explain": "Browser-facing routes live in `routes/web.php`." }
   ] }
   </script>

   Text supports `inline code` and **bold**.
   ========================================================================== */

(function () {
  var LETTERS = "ABCDEFGH";

  function esc(s) {
    return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }

  function fmt(s) {
    return esc(s)
      .replace(/`([^`]+)`/g, "<code>$1</code>")
      .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
  }

  function resultFor(score, total) {
    var pct = score / total;
    if (pct === 1) return ["🏆", "Perfect score!", "You nailed every question. You're ready for the next lesson."];
    if (pct >= 0.6) return ["🎉", "Nice work!", "Solid understanding. Skim the explanations above for the ones you missed."];
    return ["💪", "Keep going!", "Re-read the sections above and try again — repetition is how it sticks."];
  }

  function build(script) {
    var data;
    try {
      data = JSON.parse(script.textContent);
    } catch (e) {
      console.error("Quiz JSON is invalid:", e, script);
      return;
    }
    var questions = Array.isArray(data) ? data : data.questions || [];
    if (!questions.length) return;
    var title = (data && data.title) || "Quick check";

    var quiz = document.createElement("div");
    quiz.className = "quiz";
    var html =
      '<div class="quiz-head"><h3><span aria-hidden="true">🧠</span> ' +
      esc(title) +
      '</h3><span class="quiz-score" aria-live="polite">0 / ' +
      questions.length +
      ' answered</span></div><div class="quiz-bar"><span></span></div>';

    questions.forEach(function (q, qi) {
      html +=
        '<div class="quiz-q" data-q="' + qi + '"><div class="quiz-q-title"><span class="quiz-q-num">' +
        (qi + 1) + ".</span><span>" + fmt(q.q) + '</span></div><div class="quiz-options" role="group">';
      q.options.forEach(function (opt, oi) {
        html +=
          '<button type="button" class="quiz-opt" data-o="' + oi + '"><span class="quiz-letter">' +
          LETTERS[oi] + "</span><span>" + fmt(opt) + "</span></button>";
      });
      html += '</div><div class="quiz-explain-slot" aria-live="polite"></div></div>';
    });

    html +=
      '<div class="quiz-result"><div class="big-emoji"></div><h3></h3><p></p>' +
      '<button type="button" class="btn quiz-retry">↻ Try again</button></div>';
    quiz.innerHTML = html;

    var answered = 0;
    var correct = 0;
    var scoreEl = quiz.querySelector(".quiz-score");
    var barEl = quiz.querySelector(".quiz-bar span");
    var resultEl = quiz.querySelector(".quiz-result");

    function update() {
      scoreEl.textContent = answered < questions.length ? answered + " / " + questions.length + " answered" : correct + " / " + questions.length + " correct";
      barEl.style.width = (answered / questions.length) * 100 + "%";
      if (answered === questions.length) {
        var r = resultFor(correct, questions.length);
        resultEl.querySelector(".big-emoji").textContent = r[0];
        resultEl.querySelector("h3").textContent = r[1] + " " + correct + "/" + questions.length;
        resultEl.querySelector("p").textContent = r[2];
        resultEl.classList.add("show");
      }
    }

    quiz.addEventListener("click", function (e) {
      var retry = e.target.closest(".quiz-retry");
      if (retry) {
        answered = 0;
        correct = 0;
        quiz.querySelectorAll(".quiz-opt").forEach(function (b) {
          b.disabled = false;
          b.classList.remove("correct", "wrong", "dim");
        });
        quiz.querySelectorAll(".quiz-explain-slot").forEach(function (s) {
          s.innerHTML = "";
        });
        resultEl.classList.remove("show");
        update();
        quiz.scrollIntoView({ behavior: "smooth", block: "start" });
        return;
      }

      var btn = e.target.closest(".quiz-opt");
      if (!btn || btn.disabled) return;
      var qEl = btn.closest(".quiz-q");
      var q = questions[+qEl.getAttribute("data-q")];
      var picked = +btn.getAttribute("data-o");
      var ok = picked === q.answer;

      qEl.querySelectorAll(".quiz-opt").forEach(function (b) {
        var o = +b.getAttribute("data-o");
        b.disabled = true;
        if (o === q.answer) b.classList.add("correct");
        else if (o === picked) b.classList.add("wrong");
        else b.classList.add("dim");
      });

      qEl.querySelector(".quiz-explain-slot").innerHTML =
        '<div class="quiz-explain">' +
        (ok ? '<strong class="ok">✓ Correct!</strong> ' : '<strong class="no">✗ Not quite.</strong> ') +
        fmt(q.explain || "") +
        "</div>";

      answered++;
      if (ok) correct++;
      update();
    });

    script.parentNode.insertBefore(quiz, script);
  }

  document.querySelectorAll("script.quiz-data").forEach(build);
})();
