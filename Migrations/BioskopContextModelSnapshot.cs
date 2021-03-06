// <auto-generated />
using System;
using Bioskop.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace Bioskop.Migrations
{
    [DbContext(typeof(BioskopContext))]
    partial class BioskopContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "3.1.0")
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("Bioskop.Models.BioskopK", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnName("ID")
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Adresa")
                        .IsRequired()
                        .HasColumnName("Adresa")
                        .HasColumnType("nvarchar(60)")
                        .HasMaxLength(60);

                    b.Property<string>("Naziv")
                        .IsRequired()
                        .HasColumnName("Naziv")
                        .HasColumnType("nvarchar(100)")
                        .HasMaxLength(100);

                    b.HasKey("ID");

                    b.ToTable("Bioskop");
                });

            modelBuilder.Entity("Bioskop.Models.Film", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnName("ID")
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Glumci")
                        .HasColumnName("Glumci")
                        .HasColumnType("nvarchar(300)")
                        .HasMaxLength(300);

                    b.Property<string>("Naziv")
                        .IsRequired()
                        .HasColumnName("Naziv")
                        .HasColumnType("nvarchar(60)")
                        .HasMaxLength(60);

                    b.Property<string>("Zanr")
                        .IsRequired()
                        .HasColumnName("Zanr")
                        .HasColumnType("nvarchar(60)")
                        .HasMaxLength(60);

                    b.Property<int>("vremeTrajanja")
                        .HasColumnName("VremeTrajanja")
                        .HasColumnType("int")
                        .HasMaxLength(3);

                    b.HasKey("ID");

                    b.ToTable("Film");
                });

            modelBuilder.Entity("Bioskop.Models.FilmSala", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int>("FilmID")
                        .HasColumnType("int");

                    b.Property<int>("SalaID")
                        .HasColumnType("int");

                    b.Property<DateTime>("Termin")
                        .HasColumnName("Termin")
                        .HasColumnType("datetime2");

                    b.HasKey("ID");

                    b.HasIndex("FilmID");

                    b.HasIndex("SalaID");

                    b.ToTable("FilmSala");
                });

            modelBuilder.Entity("Bioskop.Models.Sala", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnName("ID")
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int?>("BioskopID")
                        .HasColumnType("int");

                    b.Property<int>("BrojSedista")
                        .HasColumnName("BrojSedista")
                        .HasColumnType("int");

                    b.Property<string>("Oznaka")
                        .IsRequired()
                        .HasColumnName("Oznaka")
                        .HasColumnType("nvarchar(60)")
                        .HasMaxLength(60);

                    b.HasKey("ID");

                    b.HasIndex("BioskopID");

                    b.ToTable("Sala");
                });

            modelBuilder.Entity("Bioskop.Models.FilmSala", b =>
                {
                    b.HasOne("Bioskop.Models.Film", "Film")
                        .WithMany("FilmSala")
                        .HasForeignKey("FilmID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Bioskop.Models.Sala", "Sala")
                        .WithMany("FilmSala")
                        .HasForeignKey("SalaID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Bioskop.Models.Sala", b =>
                {
                    b.HasOne("Bioskop.Models.BioskopK", "Bioskop")
                        .WithMany("Sale")
                        .HasForeignKey("BioskopID");
                });
#pragma warning restore 612, 618
        }
    }
}
