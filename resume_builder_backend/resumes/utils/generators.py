from django.template.loader import render_to_string
import docxtpl
import io
import os
from django.conf import settings

try:
    from weasyprint import HTML
except ImportError:
    HTML = None

def generate_pdf(resume):
    if not HTML:
        raise Exception("WeasyPrint is not installed or configured correctly.")
        
    context = {
        'resume': resume,
        'personal_info': getattr(resume, 'personal_info', None),
        'education_entries': resume.education_entries.all(),
        'experience_entries': resume.experience_entries.all(),
        'skills': resume.skills.all(),
        'languages': getattr(resume, 'languages', None) and resume.languages.all() or [],
    }
    html_string = render_to_string('resumes/europass_template.html', context)
    pdf_file = HTML(string=html_string).write_pdf()
    return pdf_file

def generate_docx(resume):
    template_path = os.path.join(settings.BASE_DIR, 'resumes', 'templates', 'resumes', 'europass_template.docx')
    if not os.path.exists(template_path):
        raise FileNotFoundError("DOCX template not found.")
        
    doc = docxtpl.DocxTemplate(template_path)
    context = {
        'full_name': resume.personal_info.full_name if hasattr(resume, 'personal_info') else 'N/A',
        'job_title': resume.personal_info.job_title if hasattr(resume, 'personal_info') else '',
        'email': resume.personal_info.email if hasattr(resume, 'personal_info') else '',
        'phone': resume.personal_info.phone if hasattr(resume, 'personal_info') else '',
        'education': list(resume.education_entries.values()),
        'experience': list(resume.experience_entries.values()),
    }
    doc.render(context)
    
    file_stream = io.BytesIO()
    doc.save(file_stream)
    return file_stream.getvalue()
