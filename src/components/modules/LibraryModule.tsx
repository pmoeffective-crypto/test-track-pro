
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/contexts/LanguageContext";
import { Search, Filter, Download, Eye, FileText, Video, Headphones, Image } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export function LibraryModule() {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("all");
  const [selectedFormat, setSelectedFormat] = useState("all");
  const [selectedType, setSelectedType] = useState("all");

  const resources = [
    {
      id: 1,
      title: t('algebraSummary'),
      description: t('algebraSummaryDesc'),
      subject: t('mathematics'),
      format: 'PDF',
      type: t('summary'),
      tags: [t('algebra'), t('equations'), t('functions')],
      downloads: 234,
      rating: 4.5,
      date: "2024-05-15"
    },
    {
      id: 2,
      title: t('mechanicsVideo'),
      description: t('mechanicsVideoDesc'),
      subject: t('physics'),
      format: 'Video',
      type: t('course'),
      tags: [t('mechanics'), t('forces'), t('movement')],
      downloads: 156,
      rating: 4.8,
      date: "2024-05-10"
    },
    {
      id: 3,
      title: t('organicChemistryAudio'),
      description: t('organicChemistryAudioDesc'),
      subject: t('chemistry'),
      format: 'Audio',
      type: t('podcast'),
      tags: [t('organicChemistry'), t('reactions'), t('molecules')],
      downloads: 89,
      rating: 4.2,
      date: "2024-05-08"
    },
    {
      id: 4,
      title: t('geometryDiagrams'),
      description: t('geometryDiagramsDesc'),
      subject: t('mathematics'),
      format: 'Image',
      type: t('diagrams'),
      tags: [t('geometry'), t('shapes'), t('theorems')],
      downloads: 178,
      rating: 4.6,
      date: "2024-05-05"
    }
  ];

  const getFormatIcon = (format: string) => {
    switch(format) {
      case 'PDF': return <FileText className="w-5 h-5 text-red-600" />;
      case 'Video': return <Video className="w-5 h-5 text-blue-600" />;
      case 'Audio': return <Headphones className="w-5 h-5 text-green-600" />;
      case 'Image': return <Image className="w-5 h-5 text-purple-600" />;
      default: return <FileText className="w-5 h-5 text-gray-600" />;
    }
  };

  const filteredResources = resources.filter(resource => {
    const matchesSearch = resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         resource.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         resource.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesSubject = selectedSubject === "all" || resource.subject === selectedSubject;
    const matchesFormat = selectedFormat === "all" || resource.format === selectedFormat;
    const matchesType = selectedType === "all" || resource.type === selectedType;
    
    return matchesSearch && matchesSubject && matchesFormat && matchesType;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-teal-600 to-teal-800 bg-clip-text text-transparent">
          {t('library')}
        </h1>
        <p className="text-muted-foreground">
          {t('libraryDescription')}
        </p>
      </div>

      {/* Filtres et recherche */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="w-5 h-5" />
            {t('searchAndFilters')}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Barre de recherche */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder={t('searchResources')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Filtres */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="text-sm font-medium mb-2 block">{t('subject')}</label>
              <Select value={selectedSubject} onValueChange={setSelectedSubject}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{t('allSubjects')}</SelectItem>
                  <SelectItem value={t('mathematics')}>{t('mathematics')}</SelectItem>
                  <SelectItem value={t('physics')}>{t('physics')}</SelectItem>
                  <SelectItem value={t('chemistry')}>{t('chemistry')}</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">{t('format')}</label>
              <Select value={selectedFormat} onValueChange={setSelectedFormat}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{t('allFormats')}</SelectItem>
                  <SelectItem value="PDF">PDF</SelectItem>
                  <SelectItem value="Video">{t('video')}</SelectItem>
                  <SelectItem value="Audio">{t('audio')}</SelectItem>
                  <SelectItem value="Image">{t('image')}</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">{t('type')}</label>
              <Select value={selectedType} onValueChange={setSelectedType}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{t('allTypes')}</SelectItem>
                  <SelectItem value={t('summary')}>{t('summary')}</SelectItem>
                  <SelectItem value={t('course')}>{t('course')}</SelectItem>
                  <SelectItem value={t('podcast')}>{t('podcast')}</SelectItem>
                  <SelectItem value={t('diagrams')}>{t('diagrams')}</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Résultats */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">
          {t('searchResults')} ({filteredResources.length})
        </h2>
        <Button variant="outline">
          <Filter className="w-4 h-4 mr-2" />
          {t('advancedFilters')}
        </Button>
      </div>

      {/* Liste des ressources */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredResources.map((resource) => (
          <Card key={resource.id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  {getFormatIcon(resource.format)}
                  <div>
                    <CardTitle className="text-lg">{resource.title}</CardTitle>
                    <CardDescription>{resource.subject}</CardDescription>
                  </div>
                </div>
                <Badge variant="outline">{resource.format}</Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">{resource.description}</p>
              
              <div className="flex flex-wrap gap-1">
                {resource.tags.map((tag, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>

              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <span>{resource.downloads} {t('downloads')}</span>
                <span>⭐ {resource.rating}</span>
                <span>{resource.date}</span>
              </div>

              <div className="flex gap-2">
                <Button size="sm" className="flex-1 bg-teal-600 hover:bg-teal-700">
                  <Eye className="w-4 h-4 mr-1" />
                  {t('view')}
                </Button>
                <Button size="sm" variant="outline" className="flex-1">
                  <Download className="w-4 h-4 mr-1" />
                  {t('download')}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredResources.length === 0 && (
        <div className="text-center py-12">
          <Search className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold mb-2">{t('noResults')}</h3>
          <p className="text-muted-foreground">{t('noResultsDescription')}</p>
        </div>
      )}
    </div>
  );
}
