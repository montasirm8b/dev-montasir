import React, { useEffect, useRef, useState } from 'react';
import { HiOutlineMail, HiOutlineLocationMarker } from 'react-icons/hi';
import { BsGithub, BsLinkedin, BsFacebook } from 'react-icons/bs';
import { AiFillTwitterCircle } from 'react-icons/ai';
import { FiCopy, FiCheck, FiSend, FiLoader, FiAlertCircle } from 'react-icons/fi';
import { gsap, getScroller, defaultEase } from '../../utils/gsap';
import Links from '../../assets/data/links.data';

const EMAIL = 'mmcse19@gmail.com';
const LOCATION = 'Rajshahi, Bangladesh';
const WEB3FORMS_KEY = process.env.REACT_APP_WEB3FORMS_KEY;

const socials = [
  { Icon: BsGithub, href: Links.github, label: 'GitHub' },
  { Icon: BsLinkedin, href: Links.linkedin, label: 'LinkedIn' },
  { Icon: BsFacebook, href: Links.facebook, label: 'Facebook' },
  { Icon: AiFillTwitterCircle, href: Links.twitter, label: 'Twitter' },
];

const Contact = () => {
  const root = useRef(null);
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [copied, setCopied] = useState(false);
  const [status, setStatus] = useState('idle'); // 'idle' | 'sending' | 'sent' | 'error'
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    if (!root.current) return;
    const scroller = getScroller();
    const heading = root.current.querySelector('[data-contact-heading]');
    const items = root.current.querySelectorAll('[data-contact-item]');

    const triggerCfg = scroller
      ? {
          scroller,
          trigger: root.current,
          start: 'top 90%',
          toggleActions: 'play none none none',
        }
      : undefined;

    const tweens = [];
    if (heading) {
      tweens.push(
        gsap.fromTo(heading,
          { x: -40, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.7,
            ease: defaultEase,
            clearProps: 'all',
            ...(triggerCfg ? { scrollTrigger: triggerCfg } : {}),
          }
        )
      );
    }
    if (items.length) {
      tweens.push(
        gsap.fromTo(items,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            stagger: 0.08,
            ease: defaultEase,
            clearProps: 'all',
            ...(triggerCfg ? { scrollTrigger: triggerCfg } : {}),
          }
        )
      );
    }

    return () => {
      tweens.forEach((t) => {
        if (t.scrollTrigger) t.scrollTrigger.kill();
        t.kill();
      });
    };
  }, []);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (e) {
      // noop
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    if (!WEB3FORMS_KEY) {
      setStatus('error');
      setErrorMsg('Form is not configured. Please email me directly.');
      return;
    }

    setStatus('sending');
    setErrorMsg('');

    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          name: form.name,
          email: form.email,
          subject: form.subject || `Portfolio contact from ${form.name}`,
          message: form.message,
          from_name: 'Portfolio Contact Form',
        }),
      });
      const data = await res.json();
      if (data.success) {
        setStatus('sent');
        setForm({ name: '', email: '', subject: '', message: '' });
        setTimeout(() => setStatus('idle'), 3000);
      } else {
        setStatus('error');
        setErrorMsg(data.message || 'Something went wrong. Please try again.');
      }
    } catch (err) {
      setStatus('error');
      setErrorMsg('Network error. Please try again.');
    }
  };

  return (
    <div ref={root} className="pt-4 pr-0 pb-3 pl-2 lg:pl-4 h-full">
      <div className="relative bg-gradient-to-br from-white/10 via-blue-500/15 to-blue-900/25 backdrop-blur-xl h-[89vh] lg:h-full w-[78.5vw] lg:w-auto rounded-2xl flex flex-col justify-start items-start p-4 lg:p-8 ring-1 ring-white/10 shadow-2xl shadow-blue-900/40 overflow-hidden">
        <div className='pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full bg-sky-400/20 blur-3xl'></div>
        <div className='pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-indigo-500/20 blur-3xl'></div>
        <div
          data-contact-heading
          className="relative z-10 flex gap-3 w-full justify-start items-center shrink-0"
        >
          <span className="font-Merriweather-bold text-xl md:text-2xl text-slate-100">Contact</span>
          <div className="h-px flex-1 bg-gradient-to-r from-sky-400/60 via-blue-500/40 to-transparent rounded-lg"></div>
        </div>

        <div className="relative z-10 flex-1 min-h-0 w-full mt-4 lg:mt-6 overflow-y-auto scrollbar-rounded pr-1">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 lg:gap-6">
            <div className="lg:col-span-2 flex flex-col gap-4">
              <div data-contact-item className="bg-white/5 backdrop-blur-md rounded-xl p-4 lg:p-5 border border-white/10">
                <h3 className="font-Merriweather-bold text-lg text-slate-100">Let's build something</h3>
                <p className="text-slate-300 font-Nunito-light text-sm mt-1 leading-relaxed">
                  Open to freelance, full-time roles, and interesting collaborations. I usually reply within 24 hours.
                </p>
              </div>

              <button
                data-contact-item
                onClick={copyEmail}
                className="group bg-white/5 hover:bg-white/10 transition-colors duration-300 backdrop-blur-md rounded-xl p-4 border border-white/10 flex items-center justify-between text-left"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="shrink-0 w-9 h-9 rounded-lg bg-sky-500/20 text-sky-300 flex items-center justify-center">
                    <HiOutlineMail size={20} />
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs uppercase tracking-wide text-slate-400 font-Nunito-light">Email</div>
                    <div className="text-slate-100 font-Nunito-regular text-sm truncate">{EMAIL}</div>
                  </div>
                </div>
                <span className="shrink-0 ml-3 text-slate-300 group-hover:text-sky-300 transition-colors">
                  {copied ? <FiCheck size={18} /> : <FiCopy size={18} />}
                </span>
              </button>

              <div data-contact-item className="bg-white/5 backdrop-blur-md rounded-xl p-4 border border-white/10 flex items-center gap-3">
                <div className="shrink-0 w-9 h-9 rounded-lg bg-sky-500/20 text-sky-300 flex items-center justify-center">
                  <HiOutlineLocationMarker size={20} />
                </div>
                <div>
                  <div className="text-xs uppercase tracking-wide text-slate-400 font-Nunito-light">Location</div>
                  <div className="text-slate-100 font-Nunito-regular text-sm">{LOCATION}</div>
                </div>
              </div>

              <div data-contact-item className="bg-white/5 backdrop-blur-md rounded-xl p-4 border border-white/10">
                <div className="text-xs uppercase tracking-wide text-slate-400 font-Nunito-light mb-3">Find me on</div>
                <div className="flex gap-3">
                  {socials.map(({ Icon, href, label }) => (
                    href ? (
                      <a
                        key={label}
                        href={href}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={label}
                        className="w-10 h-10 rounded-lg bg-white/5 hover:bg-sky-500/20 hover:text-sky-300 text-slate-200 flex items-center justify-center transition-colors duration-300"
                      >
                        <Icon size={18} />
                      </a>
                    ) : null
                  ))}
                </div>
              </div>
            </div>

            <form
              onSubmit={handleSubmit}
              className="lg:col-span-3 bg-white/5 backdrop-blur-md rounded-xl p-4 lg:p-6 border border-white/10 flex flex-col gap-3 lg:gap-4"
            >
              <div data-contact-item className="grid grid-cols-1 sm:grid-cols-2 gap-3 lg:gap-4">
                <Field
                  label="Your Name"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Jane Doe"
                  required
                />
                <Field
                  label="Email"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="jane@example.com"
                  required
                />
              </div>
              <div data-contact-item>
                <Field
                  label="Subject"
                  name="subject"
                  value={form.subject}
                  onChange={handleChange}
                  placeholder="Project inquiry"
                />
              </div>
              <div data-contact-item className="flex flex-col gap-1.5">
                <label className="text-xs uppercase tracking-wide text-slate-400 font-Nunito-light">
                  Message <span className="text-rose-400">*</span>
                </label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  placeholder="Tell me about the project, timeline, and budget…"
                  className="bg-slate-900/40 border border-white/10 focus:border-sky-400/60 focus:ring-2 focus:ring-sky-400/20 outline-none rounded-lg px-3 py-2 text-slate-100 font-Nunito-light placeholder:text-slate-500 resize-none transition-colors duration-200"
                />
              </div>
              <div data-contact-item className="flex items-center justify-between gap-3 mt-1">
                <span className={`text-xs font-Nunito-light ${status === 'error' ? 'text-rose-400' : 'text-slate-400'}`}>
                  {status === 'error' && (
                    <span className="inline-flex items-center gap-1">
                      <FiAlertCircle size={12} /> {errorMsg}
                    </span>
                  )}
                  {status === 'sent' && 'Thanks! I\'ll get back to you soon.'}
                  {(status === 'idle' || status === 'sending') && 'Sent securely via Web3Forms.'}
                </span>
                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="inline-flex items-center gap-2 bg-sky-500 hover:bg-sky-400 active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed text-white font-Nunito-regular px-4 lg:px-5 py-2 rounded-lg shadow-lg shadow-sky-500/20 transition-all duration-200"
                >
                  {status === 'sending' && <FiLoader size={16} className="animate-spin" />}
                  {status === 'sent' && <FiCheck size={16} />}
                  {(status === 'idle' || status === 'error') && <FiSend size={16} />}
                  {status === 'sending' ? 'Sending…' : status === 'sent' ? 'Sent' : 'Send Message'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

const Field = ({ label, required, ...rest }) => (
  <div className="flex flex-col gap-1.5">
    <label className="text-xs uppercase tracking-wide text-slate-400 font-Nunito-light">
      {label} {required ? <span className="text-rose-400">*</span> : null}
    </label>
    <input
      {...rest}
      required={required}
      className="bg-slate-900/40 border border-white/10 focus:border-sky-400/60 focus:ring-2 focus:ring-sky-400/20 outline-none rounded-lg px-3 py-2 text-slate-100 font-Nunito-light placeholder:text-slate-500 transition-colors duration-200"
    />
  </div>
);

export default Contact;
