---
title: Contact
description: Contact Public Powered Policy
layout: home.html
permalink: /contact/
---

## We want to hear from you

<form
  class="set-bg shadow-lg p-sm p-lg@md border-glint radius-lg"
  action="https://ppp-functions.netlify.app/.netlify/functions/contact"
  method="POST"
>
  <!-- Honeypot (hidden from humans, visible to bots) -->
  <label class="visually-hidden">
    Don’t fill this out if you’re human:
    <input type="text" name="honeypot" tabindex="-1" autocomplete="off">
  </label>

  <!-- Name + Email row -->
  <div class="flex no-wrap gap-sm column@sm mb-sm">
    <label class="w-full">
      <span>Name</span>
      <input
        type="text"
        name="name"
        placeholder="Your name"
        autocomplete="name"
        required
      >
    </label>
    <label class="w-full">
      <span>Email</span>
      <input
        type="email"
        name="email"
        placeholder="Your email address"
        autocomplete="email"
        required
      >
    </label>
  </div>

  <!-- Message -->
  <label>
    <span>Comment</span>
    <textarea
      name="message"
      placeholder="Message"
      required
    ></textarea>
  </label>

  <!-- Submit -->
  <div class="flex gap-md align-items-center justify-between gap-sm mt-sm">
    <button class="button --fill w-full@sm">Submit</button>
  </div>

  <!-- Optional success/error containers (hidden by default) -->
  <p class="form-success hidden">Thanks — your message has been sent.</p>
  <p class="form-error hidden">Something went wrong. Please try again.</p>
</form>